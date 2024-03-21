import streamlit as st
import pandas as pd
import plotly.express as px
from streamlit_extras.stylable_container import stylable_container

from datetime import datetime, timedelta

# set the layout of the app
st.set_page_config(layout='wide', page_title='VitalEaty Dashboard')

# set the title of the app
st.title('VitalEaty 🫒')


calories_df = pd.read_csv('calories.csv')
weight_df = pd.read_csv('weight.csv')

# Convert 'Date' columns to datetime
calories_df['Date'] = pd.to_datetime(calories_df['Date'])
weight_df['Date'] = pd.to_datetime(weight_df['Date'])


foods_data = {
    'Timestamp': [(datetime.now() - timedelta(hours=i)).strftime('%Y-%m-%d %H:%M:%S') for i in range(4)],
    'Description': ['Oatmeal with fruits', 'Chicken salad', 'Greek yogurt', 'Steak and vegetables'],
    'Macronutrients': ['Carbs: 40g, Protein: 10g, Fat: 5g', 
                       'Carbs: 10g, Protein: 30g, Fat: 15g',
                       'Carbs: 15g, Protein: 20g, Fat: 10g',
                       'Carbs: 5g, Protein: 35g, Fat: 20g'],
    'Image_Path': ['meals/meal1.jpeg', 'meals/meal2.jpeg', 'meals/meal3.jpeg', 'meals/meal4.jpeg']
}
foods_df = pd.DataFrame(foods_data)

col0, col11, col12 = st.columns([4, 1, 1])

with col0:
    st.header("Today's Meals")

    # Number of meals per row
    meals_per_row = 7

    # Calculate the total number of rows needed (rounding up)
    num_rows = -(-len(foods_df) // meals_per_row)  # Ceiling division

    for row_index in range(num_rows):
        columns = st.columns(meals_per_row)  # Create a row of columns
        for col_index in range(meals_per_row):
            # Calculate the overall index in the dataframe
            df_index = row_index * meals_per_row + col_index
            if df_index < len(foods_df):  # Check if the index is within the bounds of the dataframe
                row = foods_df.iloc[df_index]
                with columns[col_index]:
                    st.image(row['Image_Path'], caption=f"{row['Description']} - {row['Macronutrients']}\n{row['Timestamp']}", width=150)

with col11:
    st.header("Teresa Dan")
    st.image('person_placeholder.jpg', width=200)

with col12:
    st.write("Age: 81")
    st.write("Address: Brouwerstraat 12, Lelystad 1045AB")
    st.write("Objective: Keep Weight between 67 and 70kg")

    with stylable_container(
        "green",
        css_styles="""
        button {
            background-color: #55FF55;
            color: black;
        }""",
    ):
        st.button("Call Teresa +31 639 681 293")

    st.button("Choose different person")

    with stylable_container(
        "red",
        css_styles="""
        button {
            background-color: #FF5555;
            color: black;
        }""",
    ):
        st.button("Sign out")

st.write('---')

# Plotting
col2, col3 = st.columns([1, 1])

with col2:
    fig1 = px.bar(calories_df, x='Date', y='Calories', title='Daily Calorie Consumption')
    fig1.add_hrect(y0=1800, y1=2000, 
            annotation_text="Target intake", annotation_position="top left",
            fillcolor="green", opacity=0.25, line_width=0)
    st.plotly_chart(fig1)

with col3:
    fig2 = px.line(weight_df, x='Date', y='Weight', title='Weight Over Time')
    fig2.update_traces(line_color='#FF0000', line_width=2)

    fig2.add_hrect(y0=67, y1=70, 
            annotation_text="Target weight", annotation_position="top left",
            fillcolor="green", opacity=0.25, line_width=0)
    st.plotly_chart(fig2)

# about section
with st.expander('About this app'):
    st.write('This is a VitalEaty app. VitalEaty 2024')
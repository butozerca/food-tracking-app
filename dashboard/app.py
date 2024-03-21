import streamlit as st
import pandas as pd
import plotly.express as px

# set the layout of the app
st.set_page_config(layout='wide', page_title='VitalEaty Dashboard')

# set the title of the app
st.title('VitalEaty Dashboard')

# hide the sidebar
# st.markdown(""" <style>
#                 #MainMenu {visibility: hidden;}
#                 footer {visibility: hidden;}
#                 </style> """,
#             unsafe_allow_html=True)

# #

# about section
with st.expander('About this app'):
    st.write('This is a VitalEaty app. VitalEaty 2024')
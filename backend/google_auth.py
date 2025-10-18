import os
from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from dotenv import load_dotenv

load_dotenv()

# This is the scope for the Google Calendar API.
# It allows the application to read and write events to the user's calendar.
SCOPES = ['https://www.googleapis.com/auth/calendar']

def get_google_auth_flow():
    """
    Creates a Google OAuth 2.0 flow instance.

    NOTE: This function requires a 'client_secret.json' file to be present in the backend directory.
    This file can be downloaded from the Google Cloud Console.
    """
    return Flow.from_client_secrets_file(
        'client_secret.json',
        scopes=SCOPES,
        redirect_uri=os.getenv("REDIRECT_URI")
    )

def get_google_auth_url():
    """
    Generates the Google authentication URL.
    """
    flow = get_google_auth_flow()
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    return authorization_url, state

def fetch_google_token(code: str):
    """
    Fetches the Google access token using the authorization code.
    """
    flow = get_google_auth_flow()
    flow.fetch_token(code=code)
    credentials = flow.credentials
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }

def get_calendar_service(credentials_info: dict):
    """
    Creates a Google Calendar API service instance.
    """
    credentials = Credentials.from_authorized_user_info(credentials_info, SCOPES)
    service = build('calendar', 'v3', credentials=credentials)
    return service
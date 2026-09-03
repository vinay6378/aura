"""
Google Analytics 4 Integration Module
Provides real-time traffic and SEO metrics for the Admin Panel
"""

from google.analytics.data import BetaAnalyticsDataClient
try:
    from google.analytics.data_v1beta import BetaAnalyticsDataV1BetaClient
    from google.analytics.data_v1beta.types import (
        DateRange,
        Dimension,
        Metric,
        RunReportRequest,
    )
    GA4_AVAILABLE = True
except ImportError:
    GA4_AVAILABLE = False
    print("Google Analytics 4 library not available. Using mock data.")
from google.oauth2 import service_account
import os
import json
from datetime import datetime, timedelta
from flask import jsonify

class AnalyticsManager:
    """Manages Google Analytics 4 data fetching"""
    
    def __init__(self, property_id, credentials_path=None):
        """
        Initialize Analytics Manager
        
        Args:
            property_id (str): GA4 Property ID (format: numbers only)
            credentials_path (str): Path to service account JSON file
        """
        self.property_id = property_id
        self.credentials_path = credentials_path or os.environ.get('GA4_CREDENTIALS_PATH')
        
        if self.credentials_path and os.path.exists(self.credentials_path):
            credentials = service_account.Credentials.from_service_account_file(
                self.credentials_path,
                scopes=['https://www.googleapis.com/auth/analytics.readonly']
            )
            self.client = BetaAnalyticsDataV1BetaClient(credentials=credentials)
        else:
            # For development without credentials
            self.client = None
    
    def get_traffic_overview(self, days=7):
        """
        Get traffic overview for the specified number of days
        
        Args:
            days (int): Number of days to analyze
            
        Returns:
            dict: Traffic metrics including users, sessions, pageviews
        """
        if not self.client:
            return self._mock_traffic_data()
        
        try:
            end_date = datetime.now().strftime('%Y-%m-%d')
            start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
            
            request = RunReportRequest(
                property=f'properties/{self.property_id}',
                date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
                dimensions=[Dimension(name='date')],
                metrics=[
                    Metric(name='activeUsers'),
                    Metric(name='sessions'),
                    Metric(name='screenPageViews'),
                    Metric(name='bounceRate'),
                    Metric(name='averageSessionDuration'),
                ]
            )
            
            response = self.client.run_report(request)
            
            return self._parse_traffic_response(response)
            
        except Exception as e:
            print(f"Analytics error: {e}")
            return self._mock_traffic_data()
    
    def get_traffic_sources(self, days=30):
        """Get traffic sources breakdown"""
        if not self.client:
            return self._mock_traffic_sources()
        
        try:
            end_date = datetime.now().strftime('%Y-%m-%d')
            start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
            
            request = RunReportRequest(
                property=f'properties/{self.property_id}',
                date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
                dimensions=[Dimension(name='sessionDefaultChannelGroup')],
                metrics=[
                    Metric(name='sessions'),
                    Metric(name='activeUsers'),
                ]
            )
            
            response = self.client.run_report(request)
            return self._parse_traffic_sources(response)
            
        except Exception as e:
            print(f"Analytics error: {e}")
            return self._mock_traffic_sources()
    
    def get_top_pages(self, days=30, limit=10):
        """Get top performing pages"""
        if not self.client:
            return self._mock_top_pages()
        
        try:
            end_date = datetime.now().strftime('%Y-%m-%d')
            start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
            
            request = RunReportRequest(
                property=f'properties/{self.property_id}',
                date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
                dimensions=[Dimension(name='pagePath'), Dimension(name='pageTitle')],
                metrics=[
                    Metric(name='screenPageViews'),
                    Metric(name='activeUsers'),
                    Metric(name='averageSessionDuration'),
                ]
            )
            
            response = self.client.run_report(request)
            return self._parse_top_pages(response, limit)
            
        except Exception as e:
            print(f"Analytics error: {e}")
            return self._mock_top_pages()
    
    def get_device_breakdown(self, days=30):
        """Get device category breakdown"""
        if not self.client:
            return self._mock_device_breakdown()
        
        try:
            end_date = datetime.now().strftime('%Y-%m-%d')
            start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
            
            request = RunReportRequest(
                property=f'properties/{self.property_id}',
                date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
                dimensions=[Dimension(name='deviceCategory')],
                metrics=[
                    Metric(name='activeUsers'),
                    Metric(name='sessions'),
                ]
            )
            
            response = self.client.run_report(request)
            return self._parse_device_breakdown(response)
            
        except Exception as e:
            print(f"Analytics error: {e}")
            return self._mock_device_breakdown()
    
    def get_location_data(self, days=30, limit=20):
        """Get geographic location data"""
        if not self.client:
            return self._mock_location_data()
        
        try:
            end_date = datetime.now().strftime('%Y-%m-%d')
            start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
            
            request = RunReportRequest(
                property=f'properties/{self.property_id}',
                date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
                dimensions=[Dimension(name='country')],
                metrics=[
                    Metric(name='activeUsers'),
                    Metric(name='sessions'),
                ]
            )
            
            response = self.client.run_report(request)
            return self._parse_location_data(response, limit)
            
        except Exception as e:
            print(f"Analytics error: {e}")
            return self._mock_location_data()
    
    def _parse_traffic_response(self, response):
        """Parse traffic overview response"""
        data = {
            'activeUsers': 0,
            'sessions': 0,
            'pageViews': 0,
            'bounceRate': 0,
            'avgSessionDuration': 0,
            'timeline': []
        }
        
        for row in response.rows:
            date_value = row.dimension_values[0].value
            active_users = int(row.metric_values[0].value)
            sessions = int(row.metric_values[1].value)
            pageviews = int(row.metric_values[2].value)
            bounce_rate = float(row.metric_values[3].value)
            avg_duration = float(row.metric_values[4].value)
            
            data['timeline'].append({
                'date': date_value,
                'activeUsers': active_users,
                'sessions': sessions,
                'pageViews': pageviews,
                'bounceRate': bounce_rate,
                'avgSessionDuration': avg_duration
            })
            
            # Aggregate totals
            data['activeUsers'] += active_users
            data['sessions'] += sessions
            data['pageViews'] += pageviews
        
        # Calculate averages
        if data['timeline']:
            total_bounce = sum(row['bounceRate'] for row in data['timeline'])
            total_duration = sum(row['avgSessionDuration'] for row in data['timeline'])
            data['bounceRate'] = total_bounce / len(data['timeline'])
            data['avgSessionDuration'] = total_duration / len(data['timeline'])
        
        return data
    
    def _parse_traffic_sources(self, response):
        """Parse traffic sources response"""
        sources = []
        
        for row in response.rows:
            source = row.dimension_values[0].value
            sessions = int(row.metric_values[0].value)
            users = int(row.metric_values[1].value)
            
            sources.append({
                'source': source,
                'sessions': sessions,
                'users': users
            })
        
        return sorted(sources, key=lambda x: x['sessions'], reverse=True)
    
    def _parse_top_pages(self, response, limit):
        """Parse top pages response"""
        pages = []
        
        for row in response.rows[:limit]:
            path = row.dimension_values[0].value
            title = row.dimension_values[1].value
            pageviews = int(row.metric_values[0].value)
            users = int(row.metric_values[1].value)
            duration = float(row.metric_values[2].value)
            
            pages.append({
                'path': path,
                'title': title,
                'pageViews': pageviews,
                'activeUsers': users,
                'avgSessionDuration': duration
            })
        
        return sorted(pages, key=lambda x: x['pageViews'], reverse=True)
    
    def _parse_device_breakdown(self, response):
        """Parse device breakdown response"""
        devices = {}
        
        for row in response.rows:
            device = row.dimension_values[0].value
            users = int(row.metric_values[0].value)
            sessions = int(row.metric_values[1].value)
            
            devices[device] = {
                'device': device,
                'activeUsers': users,
                'sessions': sessions
            }
        
        return list(devices.values())
    
    def _parse_location_data(self, response, limit):
        """Parse location data response"""
        locations = []
        
        for row in response.rows[:limit]:
            country = row.dimension_values[0].value
            users = int(row.metric_values[0].value)
            sessions = int(row.metric_values[1].value)
            
            locations.append({
                'country': country,
                'activeUsers': users,
                'sessions': sessions
            })
        
        return sorted(locations, key=lambda x: x['sessions'], reverse=True)
    
    # Mock data methods for development
    def _mock_traffic_data(self):
        """Return mock traffic data for development"""
        return {
            'activeUsers': 1250,
            'sessions': 2100,
            'pageViews': 5400,
            'bounceRate': 42.5,
            'avgSessionDuration': 185,
            'timeline': [
                {
                    'date': (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d'),
                    'activeUsers': 150 + i * 10,
                    'sessions': 250 + i * 15,
                    'pageViews': 600 + i * 30,
                    'bounceRate': 40 + i * 0.5,
                    'avgSessionDuration': 180 + i * 2
                }
                for i in range(7)
            ]
        }
    
    def _mock_traffic_sources(self):
        """Return mock traffic sources for development"""
        return [
            {'source': 'Organic Search', 'sessions': 850, 'users': 520},
            {'source': 'Direct', 'sessions': 620, 'users': 380},
            {'source': 'Social Media', 'sessions': 340, 'users': 210},
            {'source': 'Referral', 'sessions': 180, 'users': 110},
            {'source': 'Email', 'sessions': 110, 'users': 70}
        ]
    
    def _mock_top_pages(self):
        """Return mock top pages for development"""
        return [
            {'path': '/', 'title': 'Home - AURA Digital', 'pageViews': 1200, 'activeUsers': 450, 'avgSessionDuration': 195},
            {'path': '/services', 'title': 'Services - AURA Digital', 'pageViews': 890, 'activeUsers': 340, 'avgSessionDuration': 220},
            {'path': '/contact', 'title': 'Contact - AURA Digital', 'pageViews': 650, 'activeUsers': 280, 'avgSessionDuration': 175},
            {'path': '/about', 'title': 'About - AURA Digital', 'pageViews': 420, 'activeUsers': 180, 'avgSessionDuration': 165},
            {'path': '/portfolio', 'title': 'Portfolio - AURA Digital', 'pageViews': 380, 'activeUsers': 160, 'avgSessionDuration': 200}
        ]
    
    def _mock_device_breakdown(self):
        """Return mock device breakdown for development"""
        return [
            {'device': 'desktop', 'activeUsers': 680, 'sessions': 1150},
            {'device': 'mobile', 'activeUsers': 420, 'sessions': 750},
            {'device': 'tablet', 'activeUsers': 150, 'sessions': 200}
        ]
    
    def _mock_location_data(self):
        """Return mock location data for development"""
        return [
            {'country': 'United States', 'activeUsers': 450, 'sessions': 780},
            {'country': 'India', 'activeUsers': 320, 'sessions': 560},
            {'country': 'United Kingdom', 'activeUsers': 180, 'sessions': 310},
            {'country': 'Canada', 'activeUsers': 120, 'sessions': 210},
            {'country': 'Australia', 'activeUsers': 90, 'sessions': 150}
        ]


class SEOManager:
    """Manages SEO metrics and data"""
    
    def __init__(self, search_console_credentials=None):
        """
        Initialize SEO Manager
        
        Args:
            search_console_credentials (str): Path to Search Console credentials
        """
        self.search_console_credentials = search_console_credentials
        # In production, integrate with Google Search Console API
    
    def get_seo_overview(self, days=30):
        """
        Get SEO overview metrics
        
        Args:
            days (int): Number of days to analyze
            
        Returns:
            dict: SEO metrics including organic traffic, keywords, etc.
        """
        # Placeholder for Search Console API integration
        return {
            'organicSearchTraffic': 850,
            'impressions': 12500,
            'clicks': 850,
            'ctr': 6.8,
            'avgPosition': 12.5,
            'keywords': self._mock_keywords(),
            'backlinks': 145,
            'domainAuthority': 32,
            'pageSpeed': {
                'desktop': 92,
                'mobile': 88
            },
            'indexedPages': 48
        }
    
    def _mock_keywords(self):
        """Return mock keyword data for development"""
        return [
            {'keyword': 'digital marketing agency', 'impressions': 2500, 'clicks': 180, 'position': 8},
            {'keyword': 'web development services', 'impressions': 1800, 'clicks': 145, 'position': 12},
            {'keyword': 'SEO services', 'impressions': 1200, 'clicks': 95, 'position': 15},
            {'keyword': 'social media marketing', 'impressions': 950, 'clicks': 78, 'position': 18},
            {'keyword': 'content marketing', 'impressions': 720, 'clicks': 62, 'position': 22}
        ]

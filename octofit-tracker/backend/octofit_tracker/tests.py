from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        marvel = Team.objects.create(_id='marvel', name='Team Marvel')
        dc = Team.objects.create(_id='dc', name='Team DC')
        ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel)
        batman = User.objects.create(name='Batman', email='batman@dc.com', team=dc)
        Activity.objects.create(user=ironman, type='run', distance=5, duration=30)
        Workout.objects.create(user=batman, workout='Cardio', reps=90)
        Leaderboard.objects.create(team=marvel, points=250)

    def test_user_team(self):
        user = User.objects.get(email='ironman@marvel.com')
        self.assertEqual(user.team.name, 'Team Marvel')

    def test_activity(self):
        activity = Activity.objects.get(type='run')
        self.assertEqual(activity.distance, 5)

    def test_leaderboard(self):
        lb = Leaderboard.objects.get(team__name='Team Marvel')
        self.assertEqual(lb.points, 250)

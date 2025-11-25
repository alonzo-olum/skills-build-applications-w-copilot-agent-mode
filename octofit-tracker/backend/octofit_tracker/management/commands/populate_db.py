from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data using Django ORM
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create Teams using Django ORM
        marvel_team = Team.objects.create(_id='marvel', name='Team Marvel')
        dc_team = Team.objects.create(_id='dc', name='Team DC')

        # Create Users using Django ORM
        iron_man = User.objects.create(
            name='Iron Man',
            email='ironman@marvel.com',
            team=marvel_team
        )
        cap = User.objects.create(
            name='Captain America',
            email='cap@marvel.com',
            team=marvel_team
        )
        wonder_woman = User.objects.create(
            name='Wonder Woman',
            email='wonderwoman@dc.com',
            team=dc_team
        )
        batman = User.objects.create(
            name='Batman',
            email='batman@dc.com',
            team=dc_team
        )

        # Create Activities using Django ORM
        Activity.objects.create(user=iron_man, type='run', distance=5, duration=30)
        Activity.objects.create(user=cap, type='cycle', distance=20, duration=60)
        Activity.objects.create(user=wonder_woman, type='swim', distance=2, duration=40)
        Activity.objects.create(user=batman, type='run', distance=10, duration=50)

        # Create Workouts using Django ORM
        Workout.objects.create(user=iron_man, workout='Chest Day', reps=100)
        Workout.objects.create(user=cap, workout='Leg Day', reps=120)
        Workout.objects.create(user=wonder_woman, workout='HIIT', reps=80)
        Workout.objects.create(user=batman, workout='Cardio', reps=90)

        # Create Leaderboard entries using Django ORM
        Leaderboard.objects.create(team=marvel_team, points=250)
        Leaderboard.objects.create(team=dc_team, points=210)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))

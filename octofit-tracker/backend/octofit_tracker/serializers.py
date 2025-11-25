from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard


class ObjectIdField(serializers.Field):
    """Custom field to convert MongoDB ObjectId to string."""
    def to_representation(self, value):
        return str(value) if value else None

    def to_internal_value(self, data):
        if data is None:
            return None
        if not isinstance(data, (str, int)):
            raise serializers.ValidationError("Invalid ObjectId format")
        return str(data)


class TeamSerializer(serializers.ModelSerializer):
    id = ObjectIdField(source='_id', read_only=True)

    class Meta:
        model = Team
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    team = ObjectIdField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    user = ObjectIdField(read_only=True)

    class Meta:
        model = Activity
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    user = ObjectIdField(read_only=True)

    class Meta:
        model = Workout
        fields = '__all__'


class LeaderboardSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    team = ObjectIdField(read_only=True)

    class Meta:
        model = Leaderboard
        fields = '__all__'

# WeatherApp

Weather forecast app that tells the current day forecast as well as the forecast for the next 3 days. 
icon images will reflect the weather conditions predicted or currently taking place based on icon data.
The user will input their city and state (us only) then submit this data. The geo location will be fetch returning the latitude and longitude for precise location data. Latitude and Longitude data will then be used to fetch the weather conditions of the location, display corresponding icon images and predict the weather for the next 3 days.

issues:
The api being used only allows 3 hour increments, breaking down each day into 8 seperate weather sections. This does not give an overall forecast for the day and min-temp/max-temp only apply for the 3 hour period. This is simply an api (free version) issue that could be rectified by using another api or a paid version. For this assignment, we will leave the limitations intact and in future update, allow user to cycle through the information for each day in 3 hour increments

Future updates:
1) refactor code for dates (too many repeats and a simple forEach would reduce redundancy)
2) add option for user to cycle through future forecast times of day (3 hour increments)
3) css style updates; cleaner look, footer info, font changes, color pallettes
5) put limitations on inputs so that user cannot enter anything that will break location request
4) publish work (github and odin project)

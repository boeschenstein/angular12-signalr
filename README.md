# SignalR in Angular

## Create new WebAp with Angular project

`dotnet new angular --no-https --name MyTest`

Create sln

`dotnet new sln`

Add Project to Sln

`dotnet sln add MyTest`

Change directory

`cd MyTest`

Run app

`dotnet run`

## Add SignalR to Backend

`dotnet add package Microsoft.AspNetCore.SignalR.Core`

Config SignalR:

```cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder
        .WithOrigins("http://localhost:44406") // the Angular app url
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});
```
```cs
builder.Services.AddSignalR();
```
```cs
app.UseCors("CorsPolicy");
```
```cs
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<SignalrDemoHub>("/signalrdemohub");
});
```

Implement SignalR:

```cs
    public interface ISignalrDemoHub
    {
        Task DisplayMessage(string message);
    }

    public class SignalrDemoHub : Hub<ISignalrDemoHub>
    {
        public void Hello(string arg)
        {
            // check webapi console
            Console.WriteLine($"Hello on Server called! arg:{arg}");

            // check browser console
            Clients.Caller.DisplayMessage("Hello from the SignalrDemoHub!");
        }
    }
```

## Add SignalR to Frontend

`npm install @microsoft/signalr`

Implement SignalR:

```typescript
import { HubConnectionBuilder } from '@microsoft/signalr';
 
var connection = new HubConnectionBuilder()
  .withUrl('http://localhost:5197/signalrdemohub')
  .build();

connection.on('DisplayMessage', (data: any) => {
  // check browser console
  console.warn('Hello! Client got message from server: data:', data);
});

connection.start().then(() => connection.invoke('Hello', 'Hi from client'));
```

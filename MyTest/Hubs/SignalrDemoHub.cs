using Microsoft.AspNetCore.SignalR;
using MyTest.Hubs;

namespace MyTest.Hub1
{
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
}

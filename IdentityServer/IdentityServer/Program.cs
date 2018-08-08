using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace WebApplication1
{
    public class Program
    {
        private static IHostingEnvironment HostingEnvironment { get; set; }
        private static IConfiguration Configuration { get; set; }
        
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    HostingEnvironment = hostingContext.HostingEnvironment;
                    Configuration = config.Build();
                })
                .UseKestrel(options =>
                {           
                    options.Listen(IPAddress.Loopback, 5000);
                    if (HostingEnvironment.IsDevelopment())
                    {
                        options.Listen(IPAddress.Loopback, 5443,
                            listenOptions => { listenOptions.UseHttps("../../dev.knowledgespike.com.pfx", "p4ssw0rd"); });
                    }
                })
                .UseStartup<Startup>()
                .Build();
    }
}
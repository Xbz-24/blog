using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using BloggerAPI.DbContexts;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? builder.Configuration.GetConnectionString("BloggerDb");

builder.Services.AddControllers();
builder.Services.AddDbContext<BloggerContext>(
    options => options.UseNpgsql(connectionString)
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
var contentRoot = app.Environment.ContentRootPath; 
var buildPath = Path.Combine(contentRoot, "build");

if (!Directory.Exists(buildPath))
{
    // Provide fallback behavior or handle the error accordingly
    Console.WriteLine($"Warning: The directory '{buildPath}' does not exist.");
    buildPath = contentRoot; // Use the application root directory as the fallback
}

if (app.Environment.IsDevelopment())
{
    app.UseCors(policy => policy.WithOrigins("http://localhost:3000")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials());
}
else
{
    app.UseCors(policy => policy.WithOrigins("https://blog-2e5.pages.dev")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials());
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(buildPath), 
    RequestPath = ""
});
app.Run();

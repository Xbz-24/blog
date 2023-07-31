using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using BloggerAPI.DbContexts;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? builder.Configuration.GetConnectionString("BloggerDb");
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<BloggerContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
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

// Configure CORS to allow requests from http://localhost:3000
app.UseCors(policy => policy.WithOrigins("http://localhost:3000")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials()); // Add this line if you need to allow credentials

app.UseAuthorization();

app.MapControllers();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "../build")),
    RequestPath = ""
});

app.Run();

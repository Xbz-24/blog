# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

COPY BloggerAPI/*.csproj ./
RUN dotnet restore

COPY BloggerAPI/ ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
COPY build ./build   
ENTRYPOINT ["dotnet", "BloggerAPI.dll"]

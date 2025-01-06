using AnimalFinderBackend.Data;
using AnimalFinderBackend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;


// builder will configure and build application
var builder = WebApplication.CreateBuilder(args);

//Using SqlServer with defined ConnectionString
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//Configure what classes Identity will use. Saving this data in db with ApplicationDbContext
builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
// Configure Identity options
builder.Services.Configure<IdentityOptions>(options =>
{
    // Password settings
    options.Password.RequireDigit = true; options.Password.RequiredLength = 8; options.Password.RequireNonAlphanumeric = true; options.Password.RequireUppercase = true; options.Password.RequireLowercase = true; options.Password.RequiredUniqueChars = 1;
    // Lockout settings 
    //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5); 
    //options.Lockout.MaxFailedAccessAttempts = 5; 
    //options.Lockout.AllowedForNewUsers = true; 
    // User settings
    options.User.RequireUniqueEmail = true;
});
// Add Authorization
builder.Services.AddAuthorization();

//Configuring authentication to use JWT-bearer. Configuring JWT-bearer with validation parameters
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
            {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            };
    });


builder.Services.AddAuthorization();


//Adding Controllers,  configuring serialization
//builder.Services.AddControllers();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
        options.JsonSerializerOptions.WriteIndented = true;
    });

//Configuring CORS
builder.Services.AddCors(options => { options.AddPolicy("AllowSpecificOrigin", builder => builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod()); });


//Using API with Swagger
builder.Services.AddEndpointsApiExplorer(); builder.Services.AddSwaggerGen(
    c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

        // Define the security scheme for JWT bearer tokens
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
            In = ParameterLocation.Header,
            Description = "Please enter JWT with Bearer into field",
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
            });

        // Add security requirement for the API
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
    }

    );

//Building App
var app = builder.Build();



//Using Swagger for developement
if (app.Environment.IsDevelopment())
    {
    app.UseSwagger();
    app.UseSwaggerUI(
        options => // UseSwaggerUI is called only in Development.
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            //options.RoutePrefix = string.Empty;
        }

        );
    app.UseDeveloperExceptionPage();
    }
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
app.Run();
using AnimalFinderBackend.DTOs;
using AnimalFinderBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AnimalFinderBackend.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
        {
        //handles Users (from Identity)
        private readonly UserManager<User> _userManager;
        //handles SignIn (from Identity)
        private readonly SignInManager<User> _signInManager;
        //handles for example JWT
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
            {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
            {
            // Creating a structured ValidationProblemDetails object to present errors if basic validation fails (according to dto)
            if (!ModelState.IsValid)
                {
                return BadRequest(new ValidationProblemDetails(ModelState)
                    {
                    Type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
                    Title = "One or more validation errors occurred.",
                    Status = StatusCodes.Status400BadRequest
                    });
                }

            var user = new User
                {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
                };

            // Creates new user in db
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
                {
                return Ok(new { Message = "User registered successfully" });
                }

            // If user cannot be added to db - Adding error description to Model State
            foreach (var error in result.Errors)
                {
                switch (error.Code)
                    {
                    case "DuplicateEmail":
                        ModelState.AddModelError("Email", "The email address is already registered.");
                        break;
                    case "DuplicateUserName":
                        break;
                    case "PasswordTooShort":
                        ModelState.AddModelError("Password", "The password is too short.");
                        break;
                    case "PasswordRequiresNonAlphanumeric":
                        ModelState.AddModelError("Password", "The password must contain at least one special character.");
                        break;
                    case "PasswordRequiresDigit":
                        ModelState.AddModelError("Password", "The password must contain at least one digit.");
                        break;
                    case "PasswordRequiresLower":
                        ModelState.AddModelError("Password", "The password must contain at least one lowercase letter.");
                        break;
                    case "PasswordRequiresUpper":
                        ModelState.AddModelError("Password", "The password must contain at least one uppercase letter.");
                        break;
                    default:
                        ModelState.AddModelError(string.Empty, error.Description);
                        break;
                    }
                }

            // Creating a ValidationProblemDetails object to present error messages
            return BadRequest(new ValidationProblemDetails(ModelState)
                {
                Type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
                Title = "One or more validation errors occurred.",
                Status = StatusCodes.Status400BadRequest
                });
            }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
            {
            //Search for user by email
            var user = await _userManager.FindByNameAsync(model.Email);
            //Controll if user exists and if password is correct for that user
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                //Creates token handler
                var tokenHandler = new JwtSecurityTokenHandler();
                //Creates secret key
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
                //Creates token descriptor with user name(email), first name & last name
                var tokenDescriptor = new SecurityTokenDescriptor
                    {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim("FirstName", user.FirstName),
                        new Claim("LastName", user.LastName)
                    }),
                    //expires in 1h
                    Expires = DateTime.UtcNow.AddHours(1),
                    //Signing token. Includes key and type of algorithm used to create signature
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                //creates token based on the tokenDesciption
                var token = tokenHandler.CreateToken(tokenDescriptor);
                //Converts token to string
                var tokenString = tokenHandler.WriteToken(token);
                //returns http 200 response with token
                return Ok(new { Token = tokenString });
                }
            //returns http 401 response
            return Unauthorized();
            }
        }
    }

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


        //Handles registration of new users
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
            {
            var user = new User
                {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName

                };
            //Creates new user in db. If user already esxists UserManager will return error
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
                {
                return Ok(new { Message = "User registered successfully" });
                }

            return BadRequest(result.Errors);
            }

        //Checks if users email exist and if password is correct. If correct, JWT-token is returned
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
            {
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                    {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim("FirstName", user.FirstName),
                        new Claim("LastName", user.LastName)
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new { Token = tokenString });
                }

            return Unauthorized();
            }
        }


    }

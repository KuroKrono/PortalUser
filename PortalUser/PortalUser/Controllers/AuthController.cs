using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PortalUser.Domain;
using PortalUser.Models;
using ProtalUser.Infrastructure.Interfaces;
using ProtalUser.Infrastructure.Extensions;
using ProtalUser.Infrastructure;

namespace PortalUser.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private IHostingEnvironment env;
        private IMapper mapper;
        private UserManager<ApplicationUser> userManger;
        private ITokenService tokenServices;
        private SignInManager<ApplicationUser> signInManager;
        private PortalUserContext context;
        //private IOptions<IdentityOptions> _identityOptions;

        public AuthController(UserManager<ApplicationUser> _userManager,
            SignInManager<ApplicationUser> _signInManager,
            //IOptions<IdentityOptions> identityOptions,
            ITokenService _tokenService,
            PortalUserContext _context,
            IMapper _mapper,
            IHostingEnvironment _env)
        {
            mapper = _mapper;
            env = _env;
            context = _context;
            //_identityOptions = identityOptions;
            tokenServices = _tokenService;
            userManger = _userManager;
            signInManager = _signInManager;
        }

        [HttpPost("token")]
        public async Task<IActionResult> Token([FromBody]AuthorizeViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await userManger.FindByNameAsync(model.Login);
            
            //context.Users.FirstOrDefault(x => x.Login == model.Login);
            
            if (user == null)
                return NotFound();
            if (user.Login != model.Login && user.Password != model.Password) //потом добавить CryptService и доделать сравнение пароля
                return BadRequest();

            var identity = await GetIdentity(user);
            var encodeJwt = tokenServices.GenerateAccessToken(identity.Claims);

            var newToken = tokenServices.GenerateRefreshToken();

            var responce = new
            {
                access_token = encodeJwt,
                refreshToken = newToken,
                user_name = identity.Name,
                role = identity.GetUserRole(),
                admin = identity.IsAdmin(),
                id = identity.getUserId<string>()
            };

            //ReplaseRefreshToken(responce.id, newToken);

            return Ok(responce);
        }

        [HttpPost("refreshtoken")]
        public async Task<IActionResult> RefreshToken([FromBody]RefrshTokenViewModel model)
        {
            var principal = tokenServices.GetPrincipalFromExpiredToken(model.Token);
            var userName = principal.Identity.Name;
            var userId = User.Identity.getUserId<string>();
            if (userId != null)
            {
                var user = await userManger.FindByIdAsync(userId);
                var savedRefreshToken = GetRefreshToken(user.Id).ToString();
                if (savedRefreshToken != model.RefreshToken)
                    throw new SecurityTokenException("Invalid refresh token");

                var newJwtToken = tokenServices.GenerateAccessToken(principal.Claims);
                var newRefreshToken = tokenServices.GenerateRefreshToken();
                //ReplaseRefreshToken(user.Id, newRefreshToken);

                var responce = new
                {
                    access_token = newJwtToken,
                    refreshToken = newRefreshToken,
                    user_name = principal.Identity.Name,
                    admin = principal.Identity.IsAdmin(),
                    id = principal.Identity.getUserId<string>()
                };
                return Ok(responce);
            }
            return null;

        }

        public async Task<string> GetRefreshToken(string Id)
        {
            var user = await userManger.FindByIdAsync(Id);
            return user.SecurityStamp;
        }

        public async Task<bool> ReplaseRefreshToken(string userId, string newRefreshToken)
        {
            var user = await userManger.FindByIdAsync(userId);
            user.ConcurrencyStamp = newRefreshToken;
            await userManger.UpdateAsync(user);
            return true;
        }

        public async Task<ClaimsIdentity> GetIdentity(ApplicationUser user)
        {

            var role = await userManger.GetRolesAsync(user);
           
            if (user == null)
                return null;

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("role", role.FirstOrDefault() == "User" ? "User" : "Admin"),
                new Claim("admin", (role.FirstOrDefault() != "User"  ? true: false).ToString())
            };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token");
            //claimsIdentity.AddClaim(user.Role.Name);
            return claimsIdentity;
        }

        /*[HttpPost("api/register")]
        public IActionResult Register([FromBody] User model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            model.Password = CryptServices.Encript(model.Password, model.Login.ToLower());
            //var roleId = ;
            //model.UserRoles = role.Id;
            ur.Add(model);
            return Ok(model);

            ViewBag.Message = "Такой пользователь уже есть";
            return BadRequest(model);
        }*/

        public async Task<ApplicationUser> GetUserAsync(AuthorizeViewModel model)
        {
            //name find by dpiscriminator
            ApplicationUser user = await userManger.FindByNameAsync(model.Login);
            if (user == null)
                return null;
            var hasUser = user.Login == model.Login && user.Password == model.Password;
            if (!hasUser)
                return null;
            return user;
        }

        [Authorize]
        [HttpGet("checktoken")]
        public async Task<IActionResult> GetAccess()
        {
            return Ok(true);
        }
    }
}

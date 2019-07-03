using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace ProtalUser.Infrastructure.Extensions
{
    public static class IdentityExtensions
    {
        public static T getUserId<T>(this IIdentity identity) where T : IConvertible
        {
            if (identity == null)
            {
                throw new ArgumentNullException("identity");
            }
            var ci = identity as ClaimsIdentity;
            if (ci != null)
            {
                var id = ci.FindFirst(ClaimTypes.NameIdentifier);
                if (id != null)
                {
                    return (T)Convert.ChangeType(id.Value, typeof(T), CultureInfo.InvariantCulture);
                }
            }
            return default(T);
        }

        public static List<string> Roles(this ClaimsIdentity identity)
        {
            return identity.Claims.Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value)
                .ToList();
        }


        /* [Authorize(Roles ="admin")]
        public ActionResult About()
        {
            ViewBag.Message = User.Identity.GetUserRole();
 
            return View();
        }*/
        public static string GetUserRole(this IIdentity identity)
        {
            if (identity == null)
            {
                throw new ArgumentNullException("identity");
            }
            var ci = identity as ClaimsIdentity;
            string role = "";
            if (ci != null)
            {
                var id = ci.FindFirst(ClaimsIdentity.DefaultRoleClaimType);
                if (id != null)
                    role = id.Value;
            }
            return role;
        }

        public static bool IsAdmin(this IIdentity identity)
        {
            if (identity == null)
            {
                throw new ArgumentNullException("identity");
            }
            var ci = identity as ClaimsIdentity;
            bool roleIsAdmin = false;
            if (ci != null)
            {
                var role = ci.FindFirst("role");
                if (role != null && role.Value == "Admin")
                {
                    roleIsAdmin = true;
                }
                else
                {
                    roleIsAdmin = false;
                }
            }
            return roleIsAdmin;
        }
    }
}

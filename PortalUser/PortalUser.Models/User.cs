using System;

namespace PortalUser.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public int DepartmentId { get; set; }

        public virtual Department Department { get; set; }
    }
}

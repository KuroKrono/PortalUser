using System;

namespace PortalUser.Domain
{
    public class UserViewModel
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public int DepartmentId { get; set; }

        public string Department { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingPhase2.Models
{

    public class Rootobject
    {
        public Employee[] Employees { get; set; }
    }

    public class Employee
    {
        public string UserId { get; set; }
        public string JobTitleName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PreferredFullName { get; set; }
        public string EmployeeCode { get; set; }
        public string Region { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }

    }

}
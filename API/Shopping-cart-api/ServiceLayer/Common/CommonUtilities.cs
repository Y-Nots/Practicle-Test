using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace ServiceLayer.Common
{
    public class CommonUtilities 
    {
        private static CommonUtilities utilities;

        private CommonUtilities()
        {
            utilities = null;
        }

        // Returns the singleton object
        public static CommonUtilities getInstance() => utilities ?? (utilities = new CommonUtilities());


        // Encodes the password 
        public string EncodePassword(string password)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(password);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        // Decodes the password
        public string DecodeFrom64(string encodedData)
        {
            if (encodedData != null)
            {
                var base64EncodedBytes = System.Convert.FromBase64String(encodedData);
                return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
            }
            else return null;

        }

        // Validates email addresses
        public bool ValidateEmail(string email) => Regex.IsMatch(email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);

        // Validates contact numbers
        public bool ValidateContactNumber(string contactNumber) => Regex.Match(contactNumber, @"^\d{7,12}$").Success;

    }
}

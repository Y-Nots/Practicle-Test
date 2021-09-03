using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace HelaSAPSync
{
    public static class Library
    {
        public static void WriteErrorLog(string Message)
        {
            StreamWriter sw = null;
            try
            {
                //sw = new StreamWriter(@"D:\Logfile.txt", true);
                sw = new StreamWriter(AppDomain.CurrentDomain.BaseDirectory +   @"\Logfile.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + " : " + Message);
                sw.Flush();
                sw.Close();
            }
            catch
            {

            }
        }
    }
}

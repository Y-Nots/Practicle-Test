using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public interface IUserRepo<T>
    {
        Task<bool> Add(T data,bool isSeller);
        Task<T> GetbyID(long id);
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public interface IUserService<T>
    {
        Task<bool> AddAsync(T dataDM, bool isSeller);
        Task<T> GetByIdAsync(long id);
    }
}

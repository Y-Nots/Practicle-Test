using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public interface IProductService<T>
    {
        Task<bool> AddAsync(T data);
        Task<bool> UpdateAsync(T data, int id);
        Task<List<T>> GetAllAsync(int? userId);
        Task<T> GetByIdAsync(long id);
        Task<bool> DeleteAsync(int id);
    }
}

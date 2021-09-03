using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public interface IProductRepo<T>
    {
        Task<bool> Add(T data);
        Task<bool> Update(T data, int id);
        Task<List<T>> GetAll(int? userId);
        Task<T> GetbyID(long id);
        Task<bool> Delete(int id);
    }
}

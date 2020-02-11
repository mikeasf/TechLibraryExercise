using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TechLibrary.Data;
using TechLibrary.Domain;
using TechLibrary.Models;

namespace TechLibrary.Services
{
    public interface IBookService
    {
        Task<List<Book>> GetBooksAsync();
        Task<Book> GetBookByIdAsync(int bookid);

        Task<List<Book>> GetBooksByPageAsync(int pageNumber, int booksNumber);
    }

    public class BookService : IBookService
    {
        private readonly DataContext _dataContext;

        public BookService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Book>> GetBooksAsync()
        {
            var queryable = _dataContext.Books.AsQueryable();
            return await queryable.ToListAsync();
        }

        public async Task<List<Book>> GetBooksByPageAsync(int pageNumber, int booksPerPage)

        {
            IQueryable<Book> queryable = null;

            int recsToSkip = (pageNumber - 1) * booksPerPage;
            if (recsToSkip == 0)
            {
                queryable = _dataContext.Books.AsQueryable().OrderBy(x => x.ShortDescr).Take(booksPerPage);
            }
            else
            {
                queryable = _dataContext.Books.AsQueryable().OrderBy(x => x.ShortDescr).Skip(recsToSkip).Take(booksPerPage);
            }
                      
            return await queryable.ToListAsync();
        }

        public async Task<Book> GetBookByIdAsync(int bookid)
        {
            return await _dataContext.Books.SingleOrDefaultAsync(x => x.BookId == bookid);
        }
    }
}

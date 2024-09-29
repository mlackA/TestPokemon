//@ts-ignore
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 5; // Número de páginas a mostrar en el rango
  const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  // Generar las páginas para mostrar
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
      <div className="flex justify-center mt-4">
          <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l-md disabled:opacity-50"
          >
              Previous
          </button>
          {pages.map((page) => (
              <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 mx-1 ${
                      currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                  } rounded-md`}
              >
                  {page}
              </button>
          ))}
          <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r-md disabled:opacity-50"
          >
              Next
          </button>
      </div>
  );
};
"use client";
import { Container } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

// { current_page: '1', per_page: 10, page_count: 25, total_count: 250 }
export default function PaginationTemp({
  current_page,
  per_page,
  page_count,
  total_count,
  selectPage,
}) {
  //   const router = useRouter();
  const handlePageClick = async (selectedPage) => {
    console.log(selectedPage);

    // selectPage(selectedPage);
    // آپدیت URL با شماره صفحه جدید
    // router.push(`/items?page=${selectedPage}`, undefined, { shallow: true });

    // اسکرول به بالای صفحه برای تجربه کاربری بهتر
    // window.scrollTo(0, 0);
  };
  // ساخت آیتم‌های Pagination
  let itemsForPagination = [];
  for (let number = 1; number <= page_count; number++) {
    itemsForPagination.push(
      <Pagination.Item
        key={number}
        active={number === current_page}
        onClick={() => handlePageClick(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            disabled={current_page === 1}
            onClick={() => handlePageClick(current_page - 1)}
          />
          {itemsForPagination}
          <Pagination.Next
            disabled={current_page === page_count}
            onClick={() => handlePageClick(current_page + 1)}
          />
        </Pagination>
      </div>
    </Container>
  );
}

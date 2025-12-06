/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SearchBar from '../../components/Table/SearchBar';
import Pagination from '../../components/Table/Pagination';
import TableWrapper from '../../components/Table/TableWrapper';
import useFetchData from '../../hooks/useFetchData';
import { useAuth } from '../../context/auth.context';
import PageSizeSelector from '../../components/Table/PageSizeSelector';
import useDelete from '../../hooks/useDelete';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import apis from '../../apis/apis';
import useDebounce from '../../hooks/useDebounce';
import useToggleStatus from '../../hooks/useToggleStatus';
import StatusToggle from '../../components/Table/StatusToggle';

const OrderListPage = () => {
  const { validToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 500);

  const fetchDataUrl = apis.order.getAll;
  const singleDeleteUrl = apis.order.deleteSingle;
  const updateStatusUrl = apis.order.update;

  const { deleteData, deleteResponse, deleteError } = useDelete();
  const { data, params, setParams, refetch, isLoading } = useFetchData(fetchDataUrl, validToken, { page, limit, search });
  const { toggling, toggleStatus } = useToggleStatus({ token: validToken, refetch });

  useEffect(() => {
    setParams({ page, limit, search });
  }, [page, limit, search]);

  const updateQueryParams = (updates = {}) => {
    const updatedParams = { page, limit, search, ...updates };
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    updateQueryParams({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  const handlePageChange = (newPage) => updateQueryParams({ page: newPage });
  const handlePageSizeChange = (newLimit) => updateQueryParams({ limit: newLimit, page: 1 });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await deleteData(`${singleDeleteUrl}/${id}`, validToken);
  };

  useEffect(() => {
    if (deleteResponse?.success) {
      toast.success("Deleted successfully");
      refetch();
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (deleteError) toast.error(deleteError);
  }, [deleteError]);

  const orders = data?.data || [];
  const total = data?.pagination?.total || 0;

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Order<span className="badge bg-secondary ms-2">{total}</span></h5>
        <SearchBar value={searchInput} onChange={(val) => setSearchInput(val)} />
      </div>

      <TableWrapper>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Customer Deatil</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 ? (
            orders?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1 + (params.page - 1) * params.limit}</td>
                <td>
                  <a style={{ display: "block" }}>{item?.user?.name}</a>
                  <a style={{ display: "block" }}>{item?.user?.email}</a>
                  <a style={{ display: "block" }}>{item?.user?.mobile}</a>
                </td>
                <td>{item?.totalAmount}</td>
                <td>{item?.paymentMethod}</td>
                <td>{item?.orderStatus}</td>
                <td>{item?.paymentStatus}</td>
                <td>
                  <StatusToggle
                    id={item?._id}
                    status={item?.status}
                    toggling={toggling}
                    onToggle={() => toggleStatus(updateStatusUrl, item?._id, item?.status)}
                  />
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                {isLoading ? "Loading..." : "No Data"}
              </td>
            </tr>
          )}
        </tbody>
      </TableWrapper>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <PageSizeSelector
          value={params.limit}
          onChange={handlePageSizeChange}
          total={total}
        />
        <Pagination
          page={params.page}
          total={total}
          limit={params.limit}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderListPage;

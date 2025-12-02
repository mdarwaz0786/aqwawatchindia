/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SearchBar from '../../../components/Table/SearchBar';
import Pagination from '../../../components/Table/Pagination';
import TableWrapper from '../../../components/Table/TableWrapper';
import useFetchData from '../../../hooks/useFetchData';
import { useAuth } from '../../../context/auth.context';
import PageSizeSelector from '../../../components/Table/PageSizeSelector';
import useDelete from '../../../hooks/useDelete';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';
import apis from '../../../apis/apis';
import useDebounce from '../../../hooks/useDebounce';
import useToggleStatus from '../../../hooks/useToggleStatus';
import StatusToggle from '../../../components/Table/StatusToggle';
import TableImage from '../../../components/Table/TableImage';

const PromotionListPage = () => {
  const { validToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 500);

  const fetchDataUrl = apis.promotion.getAll;
  const singleDeleteUrl = apis.promotion.deleteSingle;
  const updateStatusUrl = apis.promotion.update;

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
    } else if (deleteError) {
      toast.error(deleteError);
    };
  }, [deleteResponse]);

  const promotions = data?.data || [];
  const total = data?.pagination?.total || 0;

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Promotion<span className="badge bg-secondary ms-2">{total}</span></h5>
        <Link to="/promotion/add"><button className="btn btn-primary">Add New</button></Link>
        <SearchBar value={searchInput} onChange={(val) => setSearchInput(val)} />
      </div>

      <TableWrapper>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Banner</th>
            <th>Category</th>
            <th>Products</th>
            <th>Position</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {promotions?.length > 0 ? (
            promotions?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1 + (params.page - 1) * params.limit}</td>
                <td>
                  <TableImage
                    src={item?.banner}
                    alt={`banner-${index}`}
                    width={150}
                    height={50}
                  />
                </td>
                <td>{item?.category?.name}</td>
                <td>{item?.products?.map((p) => <a style={{ display: "block" }}>{p?.name}</a> || null)}</td>
                <td>{item?.position}</td>
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
                    <Link to={`/promotion/update/${item?._id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
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

export default PromotionListPage;

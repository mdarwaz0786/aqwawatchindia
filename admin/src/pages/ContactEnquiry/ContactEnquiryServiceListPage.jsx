/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SearchBar from '../../components/Table/SearchBar';
import Pagination from '../../components/Table/Pagination';
import TableWrapper from '../../components/Table/TableWrapper';
import useFetchData from '../../hooks/useFetchData';
import { useAuth } from '../../context/auth.context';
import PageSizeSelector from '../../components/Table/PageSizeSelector';
import { useSearchParams, Link } from 'react-router-dom';
import apis from '../../apis/apis';
import useDebounce from '../../hooks/useDebounce';
import useToggleStatus from '../../hooks/useToggleStatus';
import StatusToggle from '../../components/Table/StatusToggle';

const ContactEnquiryServiceListPage = () => {
  const { validToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 500);

  const fetchDataUrl = apis.contactEnquiry.getAll;
  const { data, params, setParams, isLoading } = useFetchData(fetchDataUrl, validToken, { page, limit, search, from: "Service" });
  const { toggling, toggleStatus } = useToggleStatus({ token: validToken });

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

  const enquiries = data?.data || [];
  const total = data?.pagination?.total || 0;

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Contact Enquiry<span className="badge bg-secondary ms-2">{total}</span></h5>
        <SearchBar value={searchInput} onChange={(val) => setSearchInput(val)} />
      </div>

      <TableWrapper>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>State</th>
            <th>City</th>
            <th>Service</th>
            <th>Message</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries?.length > 0 ? (
            enquiries?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1 + (params.page - 1) * params.limit}</td>
                <td>{item?.name}</td>
                <td>{item?.mobile}</td>
                <td>{item?.state}</td>
                <td>{item?.city}</td>
                <td>{item?.service?.name}</td>
                <td
                  title={item?.message}
                  style={{
                    maxWidth: "100px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item?.message}
                </td>
                <td>
                  <StatusToggle
                    id={item?._id}
                    status={item?.status}
                    toggling={toggling}
                    onToggle={() => toggleStatus(apis.contactEnquiry.update, item?._id, item?.status)}
                  />
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to={`/contact-enquiry/detail/${item?._id}`}>
                      <button className="btn btn-primary">View</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">
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

export default ContactEnquiryServiceListPage;

// src/components/WordList.js
import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const WordList = () => {
  // 1) server data + total count
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  // 2) loading & error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3) pagination / sorting / filtering params
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    sortField: 'id',
    sortOrder: 'asc',
    search: ''
  });

  // 4) fetch from server whenever params change
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = new URLSearchParams({
        page:      params.page,
        perPage:   params.perPage,
        sortField: params.sortField,
        sortOrder: params.sortOrder,
        search:    params.search
      });

      const resp = await axios.get(`/api/sentences?${q}`);
      // controller returns { total, data }
      setData(resp.data.data);
      setTotal(resp.data.total);
    } catch (err) {
      console.error(err);
      setError('Failed to load sentences.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    params.page,
    params.perPage,
    params.sortField,
    params.sortOrder,
    params.search
  ]);

  // 5) table columns
  const columns = useMemo(() => [
    {
      name:      'ID',
      selector:  row => row.id,
      sortable:  true,
      sortField: 'id',  
      width:     '80px',
    },
    {
      name:      'Khmer Word',
      selector:  row => row.sentence,
      sortable:  true,
      sortField: 'sentence',
    },
    {
      name:      'Romanization',
      selector:  row => row.romanization,
      sortable:  true,
      sortField: 'romanization',
    },
  ], []);

  // 6) search input in sub-header
  const subHeaderComponent = useMemo(() => (
    <input
      type="text"
      placeholder="🔍 Search"
      value={params.search}
      onChange={e =>
        setParams(p => ({ ...p, search: e.target.value, page: 1 }))
      }
      style={{
        padding: '0.5rem', fontSize: '1rem',
        border: '1px solid #ccc', borderRadius: '4px'
      }}
    />
  ), [params.search]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        All Khmer Words
      </h2>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      )}

      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={total}
        onChangePage={page =>
          setParams(p => ({ ...p, page }))
        }
        onChangeRowsPerPage={perPage =>
          setParams(p => ({ ...p, perPage, page: 1 }))
        }
        onSort={(col, dir) =>
          setParams(p => ({
            ...p,
            sortField: col.selector,
            sortOrder: dir
          }))
        }
        subHeader
        subHeaderComponent={subHeaderComponent}
        highlightOnHover
        pointerOnHover
        responsive
        noHeader
      />

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={fetchData}
          disabled={loading}
          style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          {loading ? 'Refreshing…' : 'Refresh List'}
        </button>
      </div>
    </div>
  );
};

export default WordList;

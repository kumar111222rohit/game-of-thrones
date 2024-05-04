import React, { useState } from 'react';
import './Loading.css';

interface Props {
  loaderRowCount?: number;
}

const LoadingTable: React.FC<Props> = ({ loaderRowCount = 3 }) => {
  const [tableDataLoaded, setTableDataLoaded] = useState(false);

  // Create rows of shimmer elements
  const shimmerRows = Array.from({ length: loaderRowCount }, (_, index) => (
    <tr key={index} className="shimmer-row">
      <td className="shimmer-cell"></td>
      <td className="shimmer-cell"></td>
      <td className="shimmer-cell"></td>
    </tr>
  ));

  return (
    <section className="full-screen-table">
      {!tableDataLoaded && (
        <table
          className="shimmer-table"
          onLoad={() => setTableDataLoaded(true)}
        >
          <tbody>{shimmerRows}</tbody>
        </table>
      )}
    </section>
  );
};

export default LoadingTable;

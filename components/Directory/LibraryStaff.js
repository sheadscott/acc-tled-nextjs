import React from 'react';
import Link from 'next/link';

const LibraryStaff = props => (
  <tbody>
    {props.data.map((row, index) => {
      if (row.gsx$name.$t.match(/vacant/i)) {
        return (
          <tr key={index} className="vacant">
            <td>Vacant</td>
            <td>{row.gsx$title.$t}</td>
            <td />
            <td />
          </tr>
        );
      }
      let phone = row.gsx$extension.$t;
      if (phone) {
        phone = phone.match(/^[\d]{4}$/) ? `(512) 223-${phone}` : `(512) ${phone}`;
      }
      return (
        <tr key={index}>
          <td>{row.gsx$name.$t}</td>
          <td>{row.gsx$title.$t}</td>
          <td className="phone">{row.gsx$extension.$t && <span>{phone}</span>}</td>
          <td>
            {row.gsx$email.$t && (
              <span>
                <Link href={`mailto:${  row.gsx$email.$t.trim()  }@austincc.edu`}>
                  <a>{`${row.gsx$email.$t.trim()  }@austincc.edu`}</a>
                </Link>
              </span>
            )}
          </td>
        </tr>
      );
    })}
  </tbody>
);

export default LibraryStaff;

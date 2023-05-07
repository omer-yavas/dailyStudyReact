import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { useGetAllMenuItemsQuery } from '../../features/BaseURL';

export default function TestMenu() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetAllMenuItemsQuery();
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // render UI based on data and loading state

  return (
    <div>
      {error ? (
        <p> error</p>
      ) : isLoading ? (
        <p>Loading</p>
      ) : data ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Menü Ögesi</th>
              <th>Ağırlığı</th>
              <th>Fiyatı</th>
              <th>Süresi</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.weight}</td>
                <td>{item.price}</td>
                <td>{item.prepareTime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </div>
  );
}

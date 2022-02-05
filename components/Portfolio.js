import React from 'react';
import tw from 'tailwind-styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Coin from './Coin';

function Portfolio({ coins }) {
  return (
    <Wrapper>
      <PortfolioTable>
        <TableItem>
          <Title>Your Assets</Title>
        </TableItem>
        <Divider />
        <Table>
          <TableItem>
            <TableRow>
              <div className="flex-1">Name</div>
              <div className="flex-1">Balance</div>
              <div className="flex-1">Price</div>
              <div className="flex-1">Allocation</div>
              <div className="text-sm">
                <BsThreeDotsVertical />
              </div>
            </TableRow>
          </TableItem>
          <Divider />
          <div>
            {coins.map((coin) => (
              <div>
                <Coin key={coin.id} coin={coin} />
                <Divider />
              </div>
            ))}
          </div>
        </Table>
      </PortfolioTable>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex-1
flex justify-center
`;

const Content = tw.div`
w-full max-w-5xl px-4 py-8
`;
const PortfolioTable = tw.div`
mt-4 border-2 border-solid border-gray-900
`;

const Table = tw.table`
w-full table-auto
`;

const TableRow = tw.tr`
w-full flex justify-between 
text-white text-xl space-x-4
    
`;

const TableItem = tw.thead`
 px-4 py-8
`;

const Divider = tw.div`
border-b-2 border-solid border-gray-900
`;

const Title = tw.div`
 text-2xl font-semibold text-white 
`;

export default Portfolio;

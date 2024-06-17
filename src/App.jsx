import React, { useState } from 'react';
import {Input, Button, Table, Typography, Space, Tag} from 'antd';
import { TwitterOutlined } from '@ant-design/icons';
import { addressList } from './list.js';

const { Title, Text } = Typography;
const { TextArea } = Input;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const addresses = inputValue
        .split(/[,\n]/)
        .map((address) => address.trim().toLowerCase())
        .filter((address, index, self) => address !== '' && self.indexOf(address) === index);

    const results = addresses.map((address) => ({
      address,
      found: addressList.some((item) => item.toLowerCase() === address),
    }));
    setSearchResults(results);
  };

  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Found',
      dataIndex: 'found',
      key: 'found',
      render: (found) => (found ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>),
    },
  ];

  return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Space direction="vertical" size="large" style={{ flex: 1, padding: '24px' }}>
          <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
            EVM Address Checker
          </Title>
          <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter EVM addresses (comma or newline separated)"
              style={{ fontSize: '16px' ,minHeight: '300px' }}
          />
          <Button type="primary" block onClick={handleSearch}>
            Search
          </Button>
          <Table dataSource={searchResults} columns={columns} pagination={false}/>
        </Space>
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <Text>
            Made by{' '}
            <a href="https://twitter.com/123xzr" target="_blank" rel="noopener noreferrer">
              @123xzr
            </a>{' '}
            <TwitterOutlined />
          </Text>
        </div>
      </div>
  );
}

export default App;
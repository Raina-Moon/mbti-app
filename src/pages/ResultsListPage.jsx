import React, { useEffect, useState } from "react";
import { getTestResults } from "../api/testResult";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: #333;
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHead = styled.thead`
  background-color: #f9f9f9;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
`;

const ResultsList = () => {
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getTestResults();
        setTestResults(results);
      } catch (error) {
        console.error("Failed to fetch test results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <Container>
      <Title>All User Results</Title>
      <ResultsTable>
        <TableHead>
          <TableRow>
            <TableHeader>User ID</TableHeader>
            <TableHeader>MBTI Result</TableHeader>
            <TableHeader>Timestamp</TableHeader>
            <TableHeader>Visibility</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {testResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{result.userId}</TableCell>
              <TableCell>{result.result}</TableCell>
              <TableCell>{new Date(result.timestamp).toLocaleString()}</TableCell>
              <TableCell>{result.isVisible ? "Public" : "Private"}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </ResultsTable>
    </Container>
  );
};

export default ResultsList;

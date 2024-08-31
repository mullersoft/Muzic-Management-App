import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Styled components
const ReportContainer = styled.div`
  padding: 20px;
`;

const StatisticSection = styled.div`
  margin-bottom: 40px;
`;

const ChartTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const StatisticsCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const StatisticsLabel = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const StatisticsValue = styled.div`
  color: #333;
`;

const HorizontalList = styled.div`
  display: flex;
  gap: 20px; /* Spacing between items */
  overflow-x: auto; /* Scroll horizontally if items exceed the container width */
`;

const Report: React.FC = () => {
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('/api/v1/statistics');
        setStatistics(response.data.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  if (!statistics) return <p>Loading...</p>;

  return (
    <ReportContainer>
      <StatisticSection>
        <ChartTitle>Total Counts</ChartTitle>
        <ChartContainer>
          <PieChart width={400} height={400}>
            <Pie
              data={[
                { name: 'Songs', value: statistics.totalSongs },
                { name: 'Artists', value: statistics.totalArtists },
                { name: 'Albums', value: statistics.totalAlbums },
                { name: 'Genres', value: statistics.totalGenres },
              ]}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }: { name: string; value: number }) => `${name}: ${value}`}
              outerRadius={150}
              fill="#8884d8"
            >
              {['#8884d8', '#82ca9d', '#ffc658', '#ff7300'].map((color, index) => (
                <Cell key={index} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartContainer>
      </StatisticSection>

      <StatisticSection>
        <StatisticsCard>
          <ChartTitle>Songs Per Genre</ChartTitle>
          <HorizontalList>
            {statistics.songsPerGenre.map((item: any, index: number) => (
              <div key={index}>
                <StatisticsLabel>{item.genre}</StatisticsLabel>
                <StatisticsValue>{item.numSongs} Songs</StatisticsValue>
              </div>
            ))}
          </HorizontalList>
        </StatisticsCard>
      </StatisticSection>

      <StatisticSection>
        <StatisticsCard>
          <ChartTitle>Songs and Albums Per Artist</ChartTitle>
          <HorizontalList>
            {statistics.songsAndAlbumsPerArtist.map((item: any, index: number) => (
              <div key={index}>
                <StatisticsLabel>{item.artist}</StatisticsLabel>
                <StatisticsValue>{item.numSongs} Songs, {item.numAlbums} Albums</StatisticsValue>
              </div>
            ))}
          </HorizontalList>
        </StatisticsCard>
      </StatisticSection>

      <StatisticSection>
        <StatisticsCard>
          <ChartTitle>Songs Per Album</ChartTitle>
          <HorizontalList>
            {statistics.songsPerAlbum.map((item: any, index: number) => (
              <div key={index}>
                <StatisticsLabel>{item.album}</StatisticsLabel>
                <StatisticsValue>{item.numSongs} Songs</StatisticsValue>
              </div>
            ))}
          </HorizontalList>
        </StatisticsCard>
      </StatisticSection>
    </ReportContainer>
  );
};

export default Report;

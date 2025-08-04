"use client";
import React from 'react';
import { HeaderSeoulmate } from '../../components/common/HeaderSeoulmate';
import { ClubMiniCard } from '../../components/home/club/ClubMiniCard';
import { ClubCard } from '../../components/home/club/ClubCard';
import { SectionHeader } from '../../components/home/SectionHeader';
import { ScrollableCardList } from '../../components/home/ScrollableCardList';
import { CategoryGrid } from '../../components/home/category/CategoryGrid';
import BottomNavBar from '../../components/common/BottomNavBar';

export const HomePage: React.FC = () => {
  return (
    <main className="flex flex-col items-center px-6 mt-14 mb-16 mx-auto w-full min-h-screen bg-white max-w-[clamp(360px,100vw,430px)]">
      <HeaderSeoulmate title="서울메이트" alarm={true}/>

      <div className="flex left-0 flex-col gap-7 items-center px-0 py-5 top-[203px] w-full max-w-[clamp(360px,100vw,430px)]">
        <ClubMiniCard
          image="https://api.builder.io/api/v1/image/assets/TEMP/0830a6226ef6b285754acdb3c55e7e749e64b48b?width=160"
          title="숭실대 정기모임"
          place="블루힐"
          date="7/21 18:00"
          altText=""
        />

        <section className="left-0 flex flex-col gap-5 items-start self-stretch px-4 py-0 ">
          <SectionHeader title="추천 모임" />
          <ScrollableCardList>
            <ClubCard
              image="https://api.builder.io/api/v1/image/assets/TEMP/8a697336a0668e6f2e3ffae0cb45c99d4b9d1681?width=320"
              title="페인팅 모임"
              place="학식당 옆 잔디밭"
              date="7/8 12:00"
              badge="91%"
              altText=""
            />
            <ClubCard
              image="https://api.builder.io/api/v1/image/assets/TEMP/8b57a445adaf2e0cb61b740abeae36eb3b3a9a54?width=320"
              title="피아노 독학 모임"
              place="정문 건너 자유레슨실"
              date="7/12 15:00"
              badge="nn%"
              altText=""
            />
          </ScrollableCardList>
        </section>

        <section className="flex flex-col gap-5 justify-center w-full items-start self-stretch px-4 py-0 ">
          <SectionHeader title="우리학교 모임" />
          <CategoryGrid />
        </section>

        <section className="flex flex-col gap-5 items-start self-stretch px-4 py-0 max-sm:px-4 max-sm:py-0">
          <SectionHeader title="한국어 클래스" />
          <ScrollableCardList>
            <ClubCard
              image="https://api.builder.io/api/v1/image/assets/TEMP/c470bd21cab6825806f1d59b81d84febb47dcfa2?width=320"
              title="한국어 기초 클래스"
              place="창신관 102호"
              date="7/29 12:00"
              altText=""
            />
            <ClubCard
              image="https://api.builder.io/api/v1/image/assets/TEMP/344c6a924c437317e8a762e0972dbf9e9d225456?width=320"
              title="실생활 한국어 회화"
              place="월당관 3502호"
              date="7/13 15:00"
              altText=""
            />
          </ScrollableCardList>
        </section>
    
        <BottomNavBar menu='home'/>
    </div>


    </main>
  );
};

export default HomePage;

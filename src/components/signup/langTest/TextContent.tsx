"use client";

interface isKoreanProps {
  isKorean: boolean;
}

export function TextContent({ isKorean } : isKoreanProps) {
  return (
<section className="flex flex-col items-center px-6 py-4 mt-16 rounded-lg border border-solid bg-zinc-50 border-black-700 h-[280px] w-[357px] box-border">
      <article className="flex flex-col overflow-y-auto py-2 overflow-x-hidden">
        <p className="relative text-2xl font-bold leading-9 text-zinc-900 w-[309px]">
          {isKorean ? (
            <>
            Hi, Nice to meet you.
            <br/>
            <br/>
            I’m really excited to meet new friends through this service.
            <br/>
            <br/>
            I’ve always wanted to learn about different cultures and share my own, too.
            <br/>
            <br/>
            I love talking over coffee or walking around campus.
            <br/>
            <br/>
            If you’re into music, food, or just want to practice speaking other languages together, let’s hang out!
            <br/>
            <br/>
            I hope we can learn from each other and make some great memories.
            </>
          ) : (
            <>
            안녕하세요, 만나서 반가워요.
            <br />
            <br />이 서비스를 통해 새로운 친구들을 만나게 되어 정말 기대돼요.
            <br />
            <br />
            다른 나라의 문화를 배우고 우리 나라의 문화를 공유하는 걸 정말
            좋아합니다.
            <br />
            <br />
            저는 커피 마시면서 이야기하거나 캠퍼스를 같이 산책하는 걸
            좋아해요.
            <br />
            <br />
            음악이나 음식에 관심이 있거나, 언어를 연습하고 싶다면 같이
            친해져봐요!
            <br />
            <br />
            서로에게 배우고 멋진 추억을 만들 수 있었으면 좋겠어요.
            </>
          ) }
          
        </p>
      </article>
    </section>
  );
}

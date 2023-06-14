import Image from 'next/image';
import { Inter } from 'next/font/google';
import { GetServerSideProps, NextPage } from 'next';
import { api } from '@/service/api';
import { iReturn } from '@/schemas/dictionary.schema';
import Link from 'next/link';
import play from '../assets/icon-play.svg';
import dropdown from '../assets/icon-arrow-down.svg';
import logo from '../assets/logo.svg';
import search from '../assets/icon-search.svg';
import moon from '../assets/icon-moon.svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface iProps {
  prop: iReturn;
}

interface iData {
  word: string;
}

const fonts = ['font-sans', 'font-serif', 'font-mono'];

export const Home: NextPage<iProps> = ({ prop }: iProps) => {
  const { handleSubmit, register, reset } = useForm<iData>();
  const [response, setResponse] = useState(prop);
  const [font, setFont] = useState('font-sans');
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const onSubmit = async (data: iData) => {
    try {
      const response = await api.get<iReturn[]>(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`
      );
      setResponse(response.data[0]);
    } catch (error) {
      console.log(error);
      reset();
    }
  };

  return (
    <main className={`${theme}`}>
      <div
        className={`${font} ${theme} min-h-screen flex flex-col items-center py-[10%] px-3 bg-white dark:bg-black-custom`}
      >
        <div className="max-w-lg text-black-custom dark:text-gray-600 w-[520px]">
          <header className="flex justify-between mb-6">
            <Image src={logo} alt="logo" height="25" width="0" />

            <div className="flex gap-5">
              <div
                className="relative hover:cursor-pointer w-fit leading-7"
                onClick={() => setOpen(!open)}
              >
                <div className="flex items-center gap-2">
                  <p className={font}>{font}</p>
                  <Image
                    src={dropdown}
                    alt="dropdown arrow"
                    height="5"
                  />
                </div>
                {open ? (
                  <ul className="menu absolute w-[100px] -ml-1 bg-gray-50 dark:bg-black-custom rounded-b-lg border-gray-200 dark:border-gray-500 border-x-[1px] border-b-[1px] divide-y divide-gray-200 dark:divide-gray-500 -mt-1 z-10">
                    {fonts
                      .filter((f) => f != font)
                      .map((t) => (
                        <li
                          key={t}
                          className={`${t} menu-item w-full text-center transition ease-linear delay-100 hover:bg-white dark:hover:bg-gray-700 cursor-pointer`}
                          onClick={() => {
                            setFont(t);
                            setOpen(!open);
                          }}
                        >
                          {t}
                        </li>
                      ))}
                  </ul>
                ) : null}
              </div>

              <div className="flex-grow w-[1px]  bg-gray-700"></div>

              <label className="relative flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onClick={() =>
                    theme == 'light'
                      ? setTheme('dark')
                      : setTheme('light')
                  }
                />
                <div className="w-8 h-4 peer-focus:outline-none rounded-full peer bg-gray-500 dark:bg-purple-custom peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[8px] after:left-[4px] after:bg-white  after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-purple-custom" />
                <Image
                  src={moon}
                  alt="logo"
                  height="18"
                  className="mb-0.5"
                />
              </label>
            </div>
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative"
          >
            <input
              className="w-full py-2 px-4 rounded dark:text-gray-500 bg-gray-700 dark:bg-gray-100 dark:bg-grey-custom focus:outline-purple-custom"
              type="text"
              placeholder="Search for any word..."
              {...register('word')}
            />
            <Image
              src={search}
              alt="search"
              className="absolute right-4 top-2.5 hover:cursor-pointer"
              onClick={handleSubmit(onSubmit)}
            />
          </form>
          <div className="flex justify-between dark:text-white">
            <small className="py-3 space-y-2">
              <h2 className="text-5xl font-bold">{response.word}</h2>
              <p className="text-base font-semibold text-purple-custom">
                {response.phonetic
                  ? response.phonetic
                  : response.phonetics.find((word) => word.text)
                      ?.text}
              </p>
            </small>
            <small className="flex gap-1.5">
              {response.phonetics.map((word) => (
                <>
                  {word.text && word.audio && (
                    <Image
                      src={play}
                      alt="play button"
                      onClick={() => {
                        new Audio(word.audio).play();
                      }}
                      className="hover:cursor-pointer hover:brightness-110 transition ease-in-out delay-300"
                    />
                  )}
                </>
              ))}
            </small>
          </div>
          <div>
            {response.meanings.map((word) => (
              <>
                <div className="flex items-center py-2">
                  <p
                    className="text-lg font-bold italic dark:text-white"
                    key={word.partOfSpeech}
                  >
                    {word.partOfSpeech}
                  </p>
                  <div className="flex-grow h-[2px] bg-gray-300 ml-4" />
                </div>
                <p>Meaning</p>
                {word.definitions.map((def) => (
                  <>
                    <li
                      className="marker:text-purple-custom"
                      key={def.definition}
                    >
                      {def.definition}
                    </li>
                    {word.partOfSpeech == 'verb' ? (
                      <p className="font-semibold text-lg text-gray-500 dark:text-gray-400">
                        {def.example}
                      </p>
                    ) : (
                      <>
                        {word.definitions[
                          word.definitions.length - 1
                        ] == def &&
                          word.synonyms[0] && (
                            <small className="flex gap-2 items-center">
                              <p className="font-semibold text-lg text-gray-500 dark:text-gray-400">
                                Synonyms
                              </p>
                              <p className=" text-base text-purple-custom">
                                {word.synonyms[0]}
                              </p>
                            </small>
                          )}
                      </>
                    )}
                  </>
                ))}
              </>
            ))}
          </div>
          <div className="flex-grow h-[1px] bg-gray-300 my-3" />
          <p className="-mb-1">Source</p>

          <Link
            href={`${response.sourceUrls}`}
            className="text-xs text-purple-custom after:content-['_↗']"
          >
            {' '}
            {response.sourceUrls}
          </Link>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<iProps> = async (
  contexto
) => {
  const response = await api.get<iReturn[]>(
    `https://api.dictionaryapi.dev/api/v2/entries/en/keyboard`
  );
  return {
    props: {
      prop: response.data[0],
    },
  };
};

export default Home;

import Layout from "@/components/shared/layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout title="首頁 -作品官網">
      <Head>
        <meta keyword='Sample'></meta>
      </Head>
      <h1>你抵達首頁</h1>
    </Layout>
  );
}
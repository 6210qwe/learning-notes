@retry(
    stop=stop_after_attempt(10),
    wait=wait_fixed(0.5),
    retry=retry_if_exception_type(
        aiohttp.ClientOSError, asyncio.TimeoutError, aiohttp.ClientError, aiohttp.ClientResponseError)
)
async def fetch(self, session, url):
    try:
        async with session.get(
            url,
            headers=self.base_data['headers'],
            proxy=self.proxies['https'] if self.use_proxy else None,
            timeout=self.async_timeout,
            ssl=False
        ) as response:
            if response.status != 200:
                status_error = aiohttp.ClientResponseError(
                    request_info=response.request_info,
                    history=response.history,
                    status=response.status,
                    message=f"请求异常，状态码：{response.status}",
                    headers=response.headers
                )
                # logger.error(status_error)
                raise status_error
            response.encoding = 'utf-8'
            return await response.text()
    except Exception as e:
        if self.use_proxy:
            logger.warning(f"代理失败，更换代理 | 异常：{type(e).__name__}")
            self.proxies = await _getPinzanProxy()
            logger.info(f"新代理：{self.proxies}")
            return await self.fetch(session, url)
        logger.error(f"请求异常：{e}\n")
        raise e
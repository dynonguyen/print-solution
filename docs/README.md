<h1 align="center">📑 Documentation & Project Convention </h1>

## Team Convention

- Dùng Docker để chạy các service - giúp dễ dàng trong hỗ trợ fix bug.
- Recommend dùng VSCode là code editor để đồng nhất format code. Nên cài các extensions sau:
  - [Prettier - code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)
  - [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [TODO Tree - Note TODO, BUG comments](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
  - [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- Cập nhật trạng thái task trên Notion trước và trong khi làm task.
- Git convention:

  - Dùng `yarn commit` để commit theo chuẩn để dễ trace history

    ![](./imgs/Screenshot_20230401_214440.png)

  - Thứ tự khi làm 1 feature mới:
    - Từ `develop`, pull code mới nhất về
    - Tách branch mới với prefix `feature/<name>` (hoặc các prefix khác như /setup, hotfix/ ...)
    - Sau khi code xong, pull `develop` và **xử lý conflict** nếu có.
    - Tạo `Pull Request`, assign & notify teams review
    - Merge develop & xóa branch nếu không dùng nữa.

- Coding convention:

  - Hạn chế tối đa `Hard code`, nên bỏ vào constants để sử dụng.
  - Với các service BE dùng `logger` thay cho `console.log` để trace log **(Bắt Buộc)**

  ![](./imgs/Screenshot_20230401_215144.png)

  - Các hàm tái sử dụng nên được viết ra utils, trước khi viết hàm (component) nên xem đã có ai viết trước đó hay chưa.
  - Các Promise nên dùng `to()` function trong [await-to-js](https://www.npmjs.com/package/await-to-js) để giảm try-catch

  ![](./imgs/Screenshot_20230401_214948.png)

## Get Started

- Cách chạy service xem file [README.md](../README.md) bên ngoài.
- Sau khi chạy xong, kiểm tra lại services đã chạy hết hay chưa (trừ service `mongo-import`):

![](./imgs/screen-shot.png)

- Kiểm tra qua trình duyệt:

  - Frontend: [http://localhost:8000](http://localhost:8000)
  - Với REST service: `http://localhost:3000/api/<service-name>/check-health`

    ![](./imgs/screen-shot-1.png)

  - Với GraphQL service: `http://localhost:3000/api/<service-name>` sẽ thấy màn hình Apollo sandbox

    ![](./imgs/Screenshot_20230401_211129.png)

  - Keycloak admin [http://localhost:8080](http://localhost:8080/admin/master/console/#/print-solution-realm)

    ![](./imgs/Screenshot_20230401_211556.png)

  - Minio console [http://localhost:9001/browser](http://localhost:9001/browser)

    ![](./imgs/Screenshot_20230401_211642.png)

  - PgAdmin [http://localhost:5050](http://localhost:5050/)

    ![](./imgs/Screenshot_20230401_211759.png)

## Frontend

- Hình ảnh, static file sử dụng qua `Minio`, không bỏ vào thư mục frontend. Sử dụng thông qua hàm `withStatic`

![](./imgs/Screenshot_20230401_212311.png)
![](./imgs/Screenshot_20230401_212214.png)

- UI Library dùng [Material UI](https://mui.com/) & **@cads-ui/core** (thư viện này tui build dựa trên MUI). **Không nên** dùng thêm các thư viện UI khác tránh conflict về theme.

- **Authentication / Authorization** thông qua keycloak, sử dụng thông qua các function sau:

  - `useKeycloakInit` khởi tạo keycloak instance, đặt trong các Guard component, chỉ load 1 lần trong mỗi Guard, layout. hook này bắt buộc phải được chạy trước khi dùng các func bên dưới

  ![](./imgs/Screenshot_20230401_213033.png)

  - `useAuth` lấy keycloak instance (userInfo sau đăng nhập) qua hook này, hoặc sử dụng trực tiếp biến `keycloak` (không khuyến khích).

  ![](./imgs/Screenshot_20230401_213348.png)

- Routes / Roles: có 3 role chính (guest/customer/admin). Mỗi role có route vào layout riêng biệt.

- Connect với REST service qua Axios

  - Các instance đã config sẵn, dùng thông qua các instance này

  ![](./imgs/Screenshot_20230401_214121.png)

  ![](./imgs/Screenshot_20230401_214037.png)

  ![](./imgs/Screenshot_20230401_214211.png)

- Connect với GraphQL qua Apollo

  1. Trong folder `graphql` tạo 1 query, mutation trong các file `.graphql` trong folder tương ứng với loại đó. (Nên test trước qua Apollo sandbox rồi copy qua cho nhanh). Có thể viết nhiều query, mutation cùng `resolver` trong cùng 1 file nhé

  ![](./imgs/Screenshot_20230401_215446.png)

  ![](./imgs/Screenshot_20230401_215536.png)

  2. Chạy câu command sau để tự generated ra các hook tương ứng với query trên. Đều này sẽ override file `graphql.tsx` trong cùng folder service đó.

  ```sh
    cd frontend
    yarn graphql-codegen-<service-name>
    # ex: yarn graphql-codegen-catalog
    # ex (watching các file .graphql): yarn graphql-codegen-catalog --watch
    # ex chạy tất cả các serivce qua: yarn graphql-codegen
  ```

  3. Vì Apollo Client chỉ nhận 1 provider gần nhất, nên khi sử dụng service graphql nào thì cần bọc ApolloProvider trên component đó. Nếu trong 1 component có sử dụng nhiều hơn 1 service graphql thì cần tách component đó ra. Có 2 cách dùng Provider, 1 là bao bởi component `<InstanceApolloProvider />` hoặc dùng HOC `withInstanceApolloProvider`

  ![](./imgs/Screenshot_20230401_220604.png)

  ![](./imgs/Screenshot_20230401_220850.png)

  4. Dùng các hook đã được generate ở bước trên.

  ![](./imgs/Screenshot_20230401_220147.png)

  ![](./imgs/Screenshot_20230401_220305.png)

## REST Services

1. Tạo route cho 1 nhóm endpoint api trong `index.js`

![](./imgs/Screenshot_20230401_221147.png)

2. Tạo 1 file trong `controllers` để handle các endpoint API trên

![](./imgs/Screenshot_20230401_221301.png)

3. Các API nào cần author để thực hiện thì dùng middleware `authenticate` chặn giữa root endpoint ở index.js hoặc mỗi endpoint cần chặn trong controllers. Sau khi dùng, nếu pass middleware này sẽ nhận được thông tin user của keycloak qua `req.user`.

![](./imgs/Screenshot_20230401_221619.png)

![](./imgs/Screenshot_20230401_221927.png)

## GraphQL Services

- Sử dụng thư viện [type-graphql](https://typegraphql.com/) để connect với Apollo server & typescript
- Tham khảo code trong category resolver.ts

![](./imgs/Screenshot_20230401_222935.png)

- Author sử dụng Decorators `@Authorized()`, ví dụ `@Authorized(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)` chỉ cho phép customer và admin thực thi. Nếu để trống thì chỉ cần có token với bất cứ role gì cùng có thể thực thi.

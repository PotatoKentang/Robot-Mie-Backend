SQLite format 3   @    �   	                                                         � .f�� 0 R��#��00                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    k3!�indexOrderDaily_date_keyOrderDaily	CREATE UNIQUE INDEX "OrderDaily_date_key" ON "OrderDaily"("date")� b/�indexOrder_orderId_keyOrderCREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId")�#!!�tableOrderDailyOrderDailyCREATE TABLE "OrderDaily" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1
)3G! indexsqlite_autoindex_OrderDaily_1OrderDaily�F�ctableProductProductCREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "callback_address" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)-A indexsqlite_autoindex_Product_1Product�x�OtableOrderOrderCREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "orderVariantId" TEXT NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
))= indexsqlite_autoindex_Order_1Order          ����	K	K	K	K	K	K	K	K	K                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
� �!U	b2813041-b1c5-4360-ba33-2c2381d63f0620240515-448e717a0-ed37-42a6-8c48-ba4381d0eb7eMie Sedap<waiting�{a��
� {!U'	1d3a5ffc-862f-4425-afd0-9ab99a6ed2ee20240515-449890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPcooking�{a����!U	de6cee38-d0b8-47e5-afe5-01ecb2f2d08820240515-348e717a0-ed37-42a6-8c48-ba4381d0eb7eMie Sedap<cooking�{`��W!U'	01037899-17c0-43b3-a92c-10d4904e1bb420240515-349890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPcooking�{`��{

U!U+	b6e0b20c-8c0c-4fa9-a67a-4221cff39d1620240515-2ad44dc64-c6e0-4478-8835-47110a6f8558Mie Sedap Panci$cooking�{:��  _!U	'	55af81c2-1acf-434c-b095-a2dcb64c39d020240515-249890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPcooking�{:��� }!U+	10ba5c8d-c5e3-4edf-93d6-a85fe5b927e420240515-7ad44dc64-c6e0-4478-8835-47110a6f8558Mie Sedap Panci$cooking�{6Tx
U!U	'	97d901d4-3787-40b4-9863-f68798be8b3220240515-749890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPcooking�{6$  t!U+	6a32ed77-ca46-4336-95d8-dcc297ab10b220240515-5ad44dc64-c6e0-4478-8835-47110a6f8558Mie Sedap Panci$waiting�{1   �!U	'	u
U!U	eb289f35-1faf-4d76-bb7d-3240f2097c1420240516-948e717a0-ed37-42a6-8c48-ba4381d0eb7eMie Sedap<cooking��0x
U!U'	9b69b79a-060f-485e-8cdd-8fa6680049c220240516-849890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPserved��#��y
U!U'	013f86f3-c6b8-4f56-84d3-2147c55b7baf20240516-649890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPcooking����t
U!U	577cd0f5-da73-4b7b-9d2e-98391408eb2620240515-548e717a0-ed37-42a6-8c48-ba4381d0eb7eMie Sedap<served�{|<�w
U!U	'	ed01b4ac-4efb-41ea-9a98-77a1fa2f131320240515-449890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPserved�{|��
   4 ��]4����������                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               > Rb2813041-b1c5-4360-ba33-2c2381d63f06> )1d3a5ffc-862f-4425-afd0-9ab99a6ed2ee��de6cee38-d0b8-47e5-afe5-01ecb2f2d088�q01037899-17c0-43b3-a92c-10d4904e1bb4(Ub6e0b20c-8c0c-4fa9-a67a-4221cff39d16
  55af81c2-1acf-434c-b095-a2dcb64c39d0	4 )10ba5c8d-c5e3-4edf-93d6-a85fe5b927e4(U97d901d4-3787-40b4-9863-f68798be8b32   {6a32ed77-ca46-4336-95d8-dcc297ab10b2(Ueb289f35-1faf-4d76-bb7d-3240f2097c14(U9b69b79a-060f-485e-8cdd-8fa6680049c2(U013f86f3-c6b8-4f56-84d3-2147c55b7baf(U577cd0f5-da73-4b7b-9d2e-98391408eb26'U	ed01b4ac-4efb-41ea-9a98-77a1fa2f1313 G �/G                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              �U'�C3-49890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.blibli.com%2Fp%2Fmie-sedap-korean-spicy-chicken-mie-instan-40-pcs-karton%2Fps--SUT-60089-00298&psig=AOvVaw2VkfgcjdlnRxFJjl1_12sw&ust=1715843253623000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCErK6Mj4YDFQAAAAAdAAAAABAE01028200700000010000101820070000001��{��  'U�C3-48e717a0-ed37-42a6-8c48-ba4381d0eb7eMie Sedap<https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.blibli.com%2Fp%2Fmie-sedap-korean-spicy-chicken-mie-i�H
U�U3-48e717a0-ed37-42a6-8c48-ba4381d0eb7eMie Sedap<https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ__e5nhgtQfIqlMqCjbNRPATgap0StEw75TImIV-Fjw&s010282006F000001000010182006F000001��{��x �U'�!3-49890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPhttps://down-id.img.susercontent.com/file/51f49c44920667ccb7dcfe5054753cca0102820070000�L
U'�U3-49890c87-0615-46bb-bda0-2e1c11d56836Mie Sedap CupPhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ__e5nhgtQfIqlMqCjbNRPATgap0StEw75TImIV-Fjw&s01028200700000010000101820070000001��{��   �U+�C3-ad44dc64-c6e0-4478-8835-47110a6f8558Mie Sedap Panci$https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.blibli.com%2Fp%2Fmie-sedap-korean-spicy-chicken-mie-instan-40-p�N
U+�U3-ad44dc64-c6e0-4478-8835-47110a6f8558Mie Sedap Panci$https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ__e5nhgtQfIqlMqCjbNRPATgap0StEw75TImIV-Fjw&s01028200710000010000101820071000001��{��
   � ���                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        (U48e717a0-ed37-42a6-8c48-ba4381d0eb7e(Uad44dc64-c6e0-4478-8835-47110a6f8558'U	49890c87-0615-46bb-bda0-2e1c11d56836   � ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            2U90e8ec7e-ba4a-4256-b196-367096610e415/16/2024
2U92a60873-1b23-41a7-aee7-71921b4ad9b15/15/2024
   � ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   (U90e8ec7e-ba4a-4256-b196-367096610e41'U	92a60873-1b23-41a7-aee7-71921b4ad9b1        ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       !20240515-3!	20240515-2
   � ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         5/16/2024	5/15/2024
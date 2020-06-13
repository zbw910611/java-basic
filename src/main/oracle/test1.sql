SELECT org_financeorg.name || '对账函' title,
       org_financeorg.name || '预收账款对账函' yszktitle,
       '客户：' || bd_customer.name lefttitle,
       '2019-01-01' || '~' || '2020-01-14' daterange,
       org_financeorg.name financeorgname,
       org_financeorg.pk_group pk_group,
       org_financeorg.pk_financeorg,
       bd_customer.pk_customer,
       bd_customer.name customername,
       bd_customer.corpaddress,
       customerlink.linkman,
       customerlink.linkphone,
       bd_customer.tel1 custtel,
       org_dept.pk_dept,
       nvl(qc.qcye, 0) qcye,
       nvl(qm.qmye, 0) dzrzmye,
       nvl(khfk.khfkje, 0) khfkje,
       nvl(znxs.znxsje, 0) znxsje,
       nvl(fl.flje, 0) flje,
       (nvl(qc.qcye, 0) + nvl(qjske.qjkhske, 0) + nvl(qjfyde.qjkhfyde, 0) -
       nvl(qjckde.qjkhckde, 0) - nvl(znxs.znxsje, 0) + nvl(khfk.khfkje, 0) +
       nvl(fl.flje, 0)) znysye,
       nvl(qc.qcye, 0) + nvl(khfk.khfkje, 0) + nvl(fl.flje, 0) -
       nvl(znxs.znxsje, 0) khyeyw,
       nvl(znxs.ckwkpje, 0) ckwkpje,
       nvl(fl.flwhcje, 0) flwhcje,
       nvl(qm.qmye, 0) - nvl(znxs.ckwkpje, 0) + nvl(fl.flwhcje, 0) khyecw,
       nvl(qm.qmye, 0) - nvl(znxs.ckwkpje, 0) + nvl(fl.flwhcje, 0) -
       nvl(qc.qcye, 0) - nvl(khfk.khfkje, 0) - nvl(fl.flje, 0) +
       nvl(znxs.znxsje, 0) chae
  FROM (SELECT gl_balance.pk_group,
               org_accountingbook.pk_relorg pk_org,
               gl_docfree1.f4               customer,
               gl_docfree1.f1               pk_dept
          FROM gl_balance
         INNER JOIN gl_docfree1
            ON gl_balance.assid = gl_docfree1.assid
         INNER JOIN org_accountingbook
            ON gl_balance.pk_accountingbook =
               org_accountingbook.pk_accountingbook
         WHERE gl_balance.YEAR = '2019'
           AND gl_balance.adjustperiod >= '00'
           AND gl_balance.adjustperiod <= '01'
           AND gl_balance.pk_accasoa IN
               (SELECT pk_accasoa
                  FROM bd_accasoa
                 INNER JOIN bd_account
                    ON bd_account.pk_account = bd_accasoa.pk_account
                 WHERE bd_accasoa.pk_accchart =
                       org_accountingbook.pk_curraccchart
                   AND bd_account.code LIKE '2203%')
           AND gl_balance.voucherkind <> 5
         GROUP BY gl_balance.pk_group,
                  org_accountingbook.pk_relorg,
                  gl_docfree1.F4,
                  gl_docfree1.f1
        UNION
        SELECT ar_gatheritem.pk_group,
               ar_gatheritem.pk_org,
               ar_gatheritem.customer,
               ar_gatheritem.pk_deptid pk_dept
          FROM ar_gatheritem
         INNER JOIN ar_gatherbill
            ON ar_gatheritem.pk_gatherbill = ar_gatherbill.pk_gatherbill
         WHERE ar_gatheritem.pk_deptid != '~'
           AND ar_gatherbill.effectstatus = 10
           AND ar_gatherbill.dr = 0
           AND ar_gatheritem.dr = 0
           AND ar_gatherbill.pk_tradetype != 'F2-Cxx-01'
           AND substr(ar_gatheritem.billdate, 0, 10) >= '2019-01-01'
           AND substr(ar_gatheritem.billdate, 0, 10) <= '2020-01-14'
         GROUP BY ar_gatheritem.pk_group,
                  ar_gatheritem.pk_org,
                  ar_gatheritem.customer,
                  ar_gatheritem.pk_deptid
        UNION
        SELECT ic_saleout_b.pk_group,
               org_orgs_v.pk_org       pk_org,
               ic_saleout_b.casscustid customer,
               org_dept_v.pk_dept      pk_dept
          FROM ic_saleout_b
         INNER JOIN ic_saleout_h
            ON ic_saleout_b.cgeneralhid = ic_saleout_h.cgeneralhid
         INNER JOIN org_dept_v
            ON org_dept_v.pk_vid = ic_saleout_h.cdptvid
         INNER JOIN org_orgs_v
            ON ic_saleout_h.cfanaceorgvid = org_orgs_v.pk_vid
         WHERE ic_saleout_h.fbillflag = 3
           AND ic_saleout_h.dr = 0
           AND ic_saleout_b.dr = 0
           AND ic_saleout_b.flargess = 'N'
           AND substr(ic_saleout_b.dbizdate, 0, 10) >= '2019-01-01'
           AND substr(ic_saleout_b.dbizdate, 0, 10) <= '2020-01-14'
         GROUP BY ic_saleout_b.pk_group,
                  org_orgs_v.pk_org,
                  ic_saleout_b.casscustid,
                  org_dept_v.PK_DEPT
        UNION
        SELECT so_arsub_b.pk_group,
               so_arsub_b.pk_org,
               so_arsub.cordercustid customer,
               org_dept_v.pk_dept    pk_dept
          FROM so_arsub_b
         INNER JOIN so_arsub
            ON so_arsub_b.carsubid = so_arsub.carsubid
         INNER JOIN org_dept_v
            ON org_dept_v.pk_vid = so_arsub.cdeptvid
         WHERE (so_arsub.fstatusflag = 2 OR so_arsub.fstatusflag = 4)
           AND so_arsub.dr = 0
           AND so_arsub_b.dr = 0
           AND substr(so_arsub_b.dbilldate, 0, 10) >= '2019-01-01'
           AND substr(so_arsub_b.dbilldate, 0, 10) <= '2020-01-14'
         GROUP BY so_arsub_b.pk_group,
                  so_arsub_b.pk_org,
                  so_arsub.cordercustid,
                  org_dept_v.PK_DEPT) deptcust
 INNER JOIN org_financeorg
    ON deptcust.pk_org = org_financeorg.pk_financeorg
 INNER JOIN bd_customer
    ON deptcust.customer = bd_customer.pk_customer
 INNER JOIN org_dept
    ON deptcust.pk_dept = org_dept.pk_dept
  LEFT outer JOIN (SELECT bd_custlinkman.pk_customer,
                          listagg(nvl(bd_linkman.name, '没留姓名'), '|') within GROUP(ORDER BY bd_linkman.name) linkman,
                          listagg(nvl(bd_linkman.phone, '没留电话'), '|') within GROUP(ORDER BY bd_linkman.name) linkphone
                     FROM bd_custlinkman
                    INNER JOIN bd_linkman
                       ON bd_custlinkman.pk_linkman = bd_linkman.PK_LINKMAN
                    GROUP BY bd_custlinkman.pk_customer) customerlink
    ON bd_customer.pk_customer = customerlink.pk_customer
  LEFT outer JOIN (SELECT gl_balance.pk_group,
                          org_accountingbook.pk_relorg pk_org,
                          gl_docfree1.f4 customer,
                          gl_docfree1.f1 pk_dept,
                          sum(CASE
                                WHEN gl_balance.adjustperiod < '01' THEN
                                 nvl(gl_balance.creditamount, 0) -
                                 nvl(gl_balance.debitamount, 0)
                                ELSE
                                 0
                              END) qcye,
                          0 qmye
                     FROM gl_balance
                    INNER JOIN gl_docfree1
                       ON gl_balance.assid = gl_docfree1.assid
                    INNER JOIN org_accountingbook
                       ON gl_balance.pk_accountingbook =
                          org_accountingbook.pk_accountingbook
                    WHERE gl_balance.YEAR = '2019'
                      AND gl_balance.adjustperiod >= '00'
                      AND gl_balance.adjustperiod <= '01'
                      AND gl_balance.pk_accasoa IN
                          (SELECT pk_accasoa
                             FROM bd_accasoa
                            INNER JOIN bd_account
                               ON bd_account.pk_account =
                                  bd_accasoa.pk_account
                            WHERE bd_accasoa.pk_accchart =
                                  org_accountingbook.pk_curraccchart
                              AND bd_account.code LIKE '2203%')
                      AND gl_balance.voucherkind <> 5
                    GROUP BY gl_balance.pk_group,
                             org_accountingbook.pk_relorg,
                             gl_docfree1.F4,
                             gl_docfree1.f1) qc
    ON org_financeorg.pk_financeorg = qc.pk_org
   AND bd_customer.pk_customer = qc.customer
   AND org_dept.pk_dept = qc.pk_dept

   LEFT outer JOIN (select gl_detail.pk_group typecode,
                                  gl_detail.pk_org pk_org,
                                  gl_docfree1.f4 customer,
                                  gl_docfree1.f1 pk_dept,
                                  0 qcye,
                                  sum(gl_detail.creditamount) qmye
                             from gl_detail
                            INNER JOIN gl_docfree1
                               ON gl_detail.assid = gl_docfree1.assid
                             join gl_voucher
                               on gl_voucher.pk_voucher =
                                  gl_detail.pk_voucher
                            INNER JOIN org_accountingbook
                               ON gl_detail.pk_accountingbook =
                                  org_accountingbook.pk_accountingbook
                            where gl_voucher.tempsaveflag = 'N'
                              and gl_voucher.year = '2019'
                              AND gl_voucher.adjustperiod >= '00'
                              AND gl_voucher.adjustperiod <= '12'
                              and gl_detail.discardflagv = 'N'
                              AND gl_detail.pk_accasoa IN
                                  (SELECT pk_accasoa
                                     FROM bd_accasoa
                                    INNER JOIN bd_account
                                       ON bd_account.pk_account =
                                          bd_accasoa.pk_account
                                    WHERE bd_accasoa.pk_accchart =
                                          org_accountingbook.pk_curraccchart
                                      AND bd_account.code LIKE '2203%')
                            group by gl_detail.pk_group,
                                     gl_detail.pk_org,
                                     gl_docfree1.f4,
                                     gl_docfree1.f1) qm
    ON org_financeorg.pk_financeorg = qm.pk_org
   AND bd_customer.pk_customer = qm.customer
   AND org_dept.pk_dept = qm.pk_dept

  LEFT outer JOIN (SELECT ar_gatheritem.pk_group,
                          ar_gatheritem.pk_org,
                          ar_gatheritem.pk_deptid pk_dept,
                          ar_gatheritem.customer,
                          sum(nvl(ar_gatheritem.money_cr, 0)) khfkje
                     FROM ar_gatheritem
                    INNER JOIN ar_gatherbill
                       ON ar_gatheritem.pk_gatherbill =
                          ar_gatherbill.pk_gatherbill
                    WHERE ar_gatherbill.effectstatus = 10
                      AND ar_gatherbill.dr = 0
                      AND ar_gatheritem.dr = 0
                      AND ar_gatherbill.pk_tradetype != 'F2-Cxx-01'
                      AND substr(ar_gatheritem.billdate, 0, 10) >=
                          '2019-01-01'
                      AND substr(ar_gatheritem.billdate, 0, 10) <=
                          '2020-01-14'
                    GROUP BY ar_gatheritem.pk_group,
                             ar_gatheritem.pk_org,
                             ar_gatheritem.customer,
                             ar_gatheritem.pk_deptid) khfk
    ON org_financeorg.pk_financeorg = khfk.pk_org
   AND bd_customer.pk_customer = khfk.customer
   AND org_dept.pk_dept = khfk.pk_dept
  LEFT outer JOIN (SELECT ic_saleout_b.pk_group,
                          org_orgs_v.pk_org pk_org,
                          org_dept_v.pk_dept pk_dept,
                          ic_saleout_b.casscustid customer,
                          sum(nvl(ic_saleout_b.norigtaxmny, 0)) znxsje,
                          sum((nvl(ic_saleout_b.nnum, 0) - nvl(kp.kpsl, 0)) *
                              nvl(ic_saleout_b.nqtorigtaxprice, 0)) ckwkpje
                     FROM ic_saleout_b
                    INNER JOIN ic_saleout_h
                       ON ic_saleout_b.cgeneralhid =
                          ic_saleout_h.cgeneralhid
                     LEFT outer JOIN (SELECT invb.csrcbid,
                                            sum(invb.nnum) kpsl
                                       FROM so_saleinvoice_b invb
                                      WHERE nvl(invb.dr, 0) = 0
                                      GROUP BY invb.csrcbid) kp
                       ON ic_saleout_b.cgeneralbid = kp.csrcbid
                     LEFT outer JOIN org_dept_v
                       ON org_dept_v.pk_vid = ic_saleout_h.cdptvid
                     LEFT outer JOIN org_orgs_v
                       ON ic_saleout_h.cfanaceorgvid = org_orgs_v.pk_vid
                    WHERE ic_saleout_h.fbillflag = 3
                      AND ic_saleout_h.dr = 0
                      AND ic_saleout_b.dr = 0
                      AND ic_saleout_b.flargess = 'N'
                      AND substr(ic_saleout_b.dbizdate, 0, 10) >=
                          '2019-01-01'
                      AND substr(ic_saleout_b.dbizdate, 0, 10) <=
                          '2020-01-14'
                    GROUP BY ic_saleout_b.pk_group,
                             org_orgs_v.pk_org,
                             ic_saleout_b.casscustid,
                             org_dept_v.pk_dept) znxs
    ON org_financeorg.pk_financeorg = znxs.pk_org
   AND bd_customer.pk_customer = znxs.customer
   AND org_dept.pk_dept = znxs.pk_dept
  LEFT outer JOIN (SELECT so_arsub_b.pk_group,
                          so_arsub_b.pk_org,
                          org_dept_v.pk_dept pk_dept,
                          so_arsub.cordercustid customer,
                          sum(nvl(so_arsub_b.norigarsubmny, 0)) flje,
                          sum(nvl(norigarsubmny, 0) - nvl(nordersubmny, 0) -
                              nvl(ninvoicesubmny, 0) - nvl(nredarsubmny, 0) -
                              nvl(nlrgcashmny, 0) - nvl(ngatheringmny, 0)) flwhcje
                     FROM so_arsub_b
                    INNER JOIN so_arsub
                       ON so_arsub_b.carsubid = so_arsub.carsubid
                     LEFT outer JOIN org_dept_v
                       ON org_dept_v.pk_vid = so_arsub.cdeptvid
                    WHERE (so_arsub.fstatusflag = 2 OR
                          so_arsub.fstatusflag = 4)
                      AND so_arsub.dr = 0
                      AND so_arsub_b.dr = 0
                      AND substr(so_arsub_b.dbilldate, 0, 10) >=
                          '2019-01-01'
                      AND substr(so_arsub_b.dbilldate, 0, 10) <=
                          '2020-01-14'
                    GROUP BY so_arsub_b.pk_group,
                             so_arsub_b.pk_org,
                             so_arsub.cordercustid,
                             org_dept_v.pk_dept) fl
    ON org_financeorg.pk_financeorg = fl.pk_org
   AND bd_customer.pk_customer = fl.customer
   AND org_dept.pk_dept = fl.pk_dept
  LEFT outer JOIN (SELECT ar_gatheritem.pk_group,
                          ar_gatheritem.pk_org,
                          ar_gatheritem.pk_deptid pk_dept,
                          ar_gatheritem.customer,
                          sum(nvl(ar_gatheritem.money_cr, 0)) qjkhske
                     FROM ar_gatheritem
                    INNER JOIN ar_gatherbill
                       ON ar_gatheritem.pk_gatherbill =
                          ar_gatherbill.pk_gatherbill
                    WHERE ar_gatherbill.effectstatus = 10
                      AND ar_gatherbill.dr = 0
                      AND ar_gatheritem.dr = 0
                      AND ar_gatherbill.pk_tradetype != 'F2-Cxx-01'
                      AND substr(ar_gatheritem.billdate, 0, 10) >=
                          '2019-01-01'
                      AND substr(ar_gatheritem.billdate, 0, 10) <
                          '2019-01-01'
                    GROUP BY ar_gatheritem.pk_group,
                             ar_gatheritem.pk_org,
                             ar_gatheritem.pk_deptid,
                             ar_gatheritem.customer) qjske
    ON org_financeorg.pk_financeorg = qjske.pk_org
   AND bd_customer.pk_customer = qjske.customer
   AND org_dept.pk_dept = qjske.pk_dept
  LEFT outer JOIN (SELECT so_arsub_b.pk_group,
                          so_arsub_b.pk_org,
                          org_dept_v.pk_dept,
                          so_arsub.cordercustid customer,
                          sum(nvl(so_arsub_b.norigarsubmny, 0)) qjkhfyde
                     FROM so_arsub_b
                    INNER JOIN so_arsub
                       ON so_arsub_b.carsubid = so_arsub.carsubid
                    INNER JOIN org_dept_v
                       ON org_dept_v.pk_vid = so_arsub.cdeptvid
                    WHERE (so_arsub.fstatusflag = 2 OR
                          so_arsub.fstatusflag = 4)
                      AND so_arsub.dr = 0
                      AND so_arsub_b.dr = 0
                      AND substr(so_arsub_b.dbilldate, 0, 10) >=
                          '2019-01-01'
                      AND substr(so_arsub_b.dbilldate, 0, 10) < '2019-01-01'
                    GROUP BY so_arsub_b.pk_group,
                             so_arsub_b.pk_org,
                             org_dept_v.pk_dept,
                             so_arsub.cordercustid) qjfyde
    ON org_financeorg.pk_financeorg = qjfyde.pk_org
   AND bd_customer.pk_customer = qjfyde.customer
   AND org_dept.pk_dept = qjfyde.pk_dept
  LEFT outer JOIN (SELECT ic_saleout_b.pk_group,
                          org_orgs_v.pk_org pk_org,
                          org_dept_v.pk_dept,
                          ic_saleout_b.casscustid customer,
                          sum(nvl(ic_saleout_b.norigtaxmny, 0)) qjkhckde
                     FROM ic_saleout_b
                    INNER JOIN ic_saleout_h
                       ON ic_saleout_b.cgeneralhid =
                          ic_saleout_h.cgeneralhid
                     LEFT outer JOIN org_dept_v
                       ON org_dept_v.pk_vid = ic_saleout_h.cdptvid
                     LEFT outer JOIN org_orgs_v
                       ON ic_saleout_h.cfanaceorgvid = org_orgs_v.pk_vid
                    WHERE ic_saleout_h.fbillflag = 3
                      AND ic_saleout_h.dr = 0
                      AND ic_saleout_b.dr = 0
                      AND ic_saleout_b.flargess = 'N'
                      AND substr(ic_saleout_b.DBIZDATE, 0, 10) >=
                          '2019-01-01'
                      AND substr(ic_saleout_b.DBIZDATE, 0, 10) <
                          '2019-01-01'
                    GROUP BY ic_saleout_b.pk_group,
                             org_orgs_v.pk_org,
                             org_dept_v.pk_dept,
                             ic_saleout_b.casscustid) qjckde
    ON org_financeorg.pk_financeorg = qjckde.pk_org
   AND bd_customer.pk_customer = qjckde.customer
   AND org_dept.pk_dept = qjckde.pk_dept
 WHERE 1 = 1
   AND org_financeorg.pk_financeorg = '0001A110000000000G9A'
   AND bd_customer.pk_customer = '0001A110000000003IN9'
   AND org_dept.pk_dept IN
       (SELECT pk_dept
          FROM org_dept
         WHERE 11 = 11
           AND (enablestate = 2)
           AND ((pk_group = '0001A1100000000002CC' AND
               pk_org = '0001A110000000000G9A'))
           AND (org_dept.innercode LIKE 'WKV2OTTF%'))

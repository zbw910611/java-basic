select org_financeorg.name || '对账函' title,
       org_financeorg.name || '预收账款对账函' yszktitle,
       '客户：' || bd_customer.name lefttitle,
       '2019-01-01' || '~' || '2019-12-31' daterange,
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
  from (select gl_balance.pk_group,
               org_accountingbook.pk_relorg pk_org,
               gl_docfree1.f4               customer,
               gl_docfree1.f1               pk_dept
          from gl_balance
         inner join gl_docfree1
            on gl_balance.assid = gl_docfree1.assid
         inner join org_accountingbook
            on gl_balance.pk_accountingbook =
               org_accountingbook.pk_accountingbook
         where gl_balance.YEAR = '2019'
           and gl_balance.adjustperiod >= '00'
           and gl_balance.adjustperiod <= '12'
           and gl_balance.pk_accasoa in
               (select pk_accasoa
                  from bd_accasoa
                 inner join bd_account
                    on bd_account.pk_account = bd_accasoa.pk_account
                 where bd_accasoa.pk_accchart =
                       org_accountingbook.pk_curraccchart
                   and bd_account.code like '2203%')
           and gl_balance.voucherkind <> 5
         group by gl_balance.pk_group,
                  org_accountingbook.pk_relorg,
                  gl_docfree1.F4,
                  gl_docfree1.f1
        union
        select ar_gatheritem.pk_group,
               ar_gatheritem.pk_org,
               ar_gatheritem.customer,
               ar_gatheritem.pk_deptid pk_dept
          from ar_gatheritem
         inner join ar_gatherbill
            on ar_gatheritem.pk_gatherbill = ar_gatherbill.pk_gatherbill
         where ar_gatheritem.pk_deptid != '~'
           and ar_gatherbill.effectstatus = 10
           and ar_gatherbill.dr = 0
           and ar_gatheritem.dr = 0
           and ar_gatherbill.pk_tradetype != 'F2-Cxx-01'
           and substr(ar_gatheritem.billdate, 0, 10) >= '2019-01-01'
           and substr(ar_gatheritem.billdate, 0, 10) <= '2019-12-31'
         group by ar_gatheritem.pk_group,
                  ar_gatheritem.pk_org,
                  ar_gatheritem.customer,
                  ar_gatheritem.pk_deptid
        union
        select ic_saleout_b.pk_group,
               org_orgs_v.pk_org       pk_org,
               ic_saleout_b.casscustid customer,
               org_dept_v.pk_dept      pk_dept
          from ic_saleout_b
         inner join ic_saleout_h
            on ic_saleout_b.cgeneralhid = ic_saleout_h.cgeneralhid
         inner join org_dept_v
            on org_dept_v.pk_vid = ic_saleout_h.cdptvid
         inner join org_orgs_v
            on ic_saleout_h.cfanaceorgvid = org_orgs_v.pk_vid
         where ic_saleout_h.fbillflag = 3
           and ic_saleout_h.dr = 0
           and ic_saleout_b.dr = 0
           and ic_saleout_b.flargess = 'N'
           and substr(ic_saleout_b.dbizdate, 0, 10) >= '2019-01-01'
           and substr(ic_saleout_b.dbizdate, 0, 10) <= '2019-12-31'
         group by ic_saleout_b.pk_group,
                  org_orgs_v.pk_org,
                  ic_saleout_b.casscustid,
                  org_dept_v.PK_DEPT
        union
        select so_arsub_b.pk_group,
               so_arsub_b.pk_org,
               so_arsub.cordercustid customer,
               org_dept_v.pk_dept    pk_dept
          from so_arsub_b
         inner join so_arsub
            on so_arsub_b.carsubid = so_arsub.carsubid
         inner join org_dept_v
            on org_dept_v.pk_vid = so_arsub.cdeptvid
         where (so_arsub.fstatusflag = 2 or so_arsub.fstatusflag = 4)
           and so_arsub.dr = 0
           and so_arsub_b.dr = 0
           and substr(so_arsub_b.dbilldate, 0, 10) >= '2019-01-01'
           and substr(so_arsub_b.dbilldate, 0, 10) <= '2019-12-31'
         group by so_arsub_b.pk_group,
                  so_arsub_b.pk_org,
                  so_arsub.cordercustid,
                  org_dept_v.PK_DEPT) deptcust
 inner join org_financeorg
    on deptcust.pk_org = org_financeorg.pk_financeorg
 inner join bd_customer
    on deptcust.customer = bd_customer.pk_customer
 inner join org_dept
    on deptcust.pk_dept = org_dept.pk_dept
  left outer join (select bd_custlinkman.pk_customer,
                          listagg(nvl(bd_linkman.name, '没留姓名'), '|') within group(order by bd_linkman.name) linkman,
                          listagg(nvl(bd_linkman.phone, '没留电话'), '|') within group(order by bd_linkman.name) linkphone
                     from bd_custlinkman
                    inner join bd_linkman
                       on bd_custlinkman.pk_linkman = bd_linkman.PK_LINKMAN
                    group by bd_custlinkman.pk_customer) customerlink
    on bd_customer.pk_customer = customerlink.pk_customer
  left outer join (select gl_balance.pk_group,
                          org_accountingbook.pk_relorg pk_org,
                          gl_docfree1.f4 customer,
                          gl_docfree1.f1 pk_dept,
                          sum(case
                                when gl_balance.adjustperiod < '01' then
                                 nvl(gl_balance.creditamount, 0) -
                                 nvl(gl_balance.debitamount, 0)
                                else
                                 0
                              end) qcye,

                          0 qmye
                     from gl_balance
                    inner join gl_docfree1
                       on gl_balance.assid = gl_docfree1.assid
                    inner join org_accountingbook
                       on gl_balance.pk_accountingbook =
                          org_accountingbook.pk_accountingbook
                    where gl_balance.YEAR = '2019'
                      and gl_balance.adjustperiod >= '00'
                      and gl_balance.adjustperiod <= '12'
                      and gl_balance.pk_accasoa in
                          (select pk_accasoa
                             from bd_accasoa
                            inner join bd_account
                               on bd_account.pk_account =
                                  bd_accasoa.pk_account
                            where bd_accasoa.pk_accchart =
                                  org_accountingbook.pk_curraccchart
                              and bd_account.code like '2203%')
                      and gl_balance.voucherkind <> 5
                    group by gl_balance.pk_group,
                             org_accountingbook.pk_relorg,
                             gl_docfree1.F4,
                             gl_docfree1.f1

                   ) qc
    on org_financeorg.pk_financeorg = qc.pk_org
   and bd_customer.pk_customer = qc.customer
   and org_dept.pk_dept = qc.pk_dept
  left outer join (select gl_detail.pk_group typecode,
                          gl_detail.pk_org pk_org,
                          gl_docfree1.f4 customer,
                          gl_docfree1.f1 pk_dept,
                          0 qcye,
                          sum(case
                                when gl_detail.adjustperiod <= '12' then
                                 nvl(gl_detail.creditamount, 0) -
                                 nvl(gl_detail.debitamount, 0)
                                else
                                 0
                              end) qmye
                     from gl_detail
                    INNER JOIN gl_docfree1
                       ON gl_detail.assid = gl_docfree1.assid
                     join gl_voucher
                       on gl_voucher.pk_voucher = gl_detail.pk_voucher
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
                             gl_docfree1.f1

                   ) qm
    on org_financeorg.pk_financeorg = qm.pk_org
   and bd_customer.pk_customer = qm.customer
   and org_dept.pk_dept = qm.pk_dept
  left outer join (select ar_gatheritem.pk_group,
                          ar_gatheritem.pk_org,
                          ar_gatheritem.pk_deptid pk_dept,
                          ar_gatheritem.customer,
                          sum(nvl(ar_gatheritem.money_cr, 0)) khfkje
                     from ar_gatheritem
                    inner join ar_gatherbill
                       on ar_gatheritem.pk_gatherbill =
                          ar_gatherbill.pk_gatherbill
                    where ar_gatherbill.effectstatus = 10
                      and ar_gatherbill.dr = 0
                      and ar_gatheritem.dr = 0
                      and ar_gatherbill.pk_tradetype != 'F2-Cxx-01'
                      and substr(ar_gatheritem.billdate, 0, 10) >=
                          '2019-01-01'
                      and substr(ar_gatheritem.billdate, 0, 10) <=
                          '2019-12-31'
                    group by ar_gatheritem.pk_group,
                             ar_gatheritem.pk_org,
                             ar_gatheritem.customer,
                             ar_gatheritem.pk_deptid) khfk
    on org_financeorg.pk_financeorg = khfk.pk_org
   and bd_customer.pk_customer = khfk.customer
   and org_dept.pk_dept = khfk.pk_dept
  left outer join (select ic_saleout_b.pk_group,
                          org_orgs_v.pk_org pk_org,
                          org_dept_v.pk_dept pk_dept,
                          ic_saleout_b.casscustid customer,
                          sum(nvl(ic_saleout_b.norigtaxmny, 0)) znxsje,
                          sum((nvl(ic_saleout_b.nnum, 0) - nvl(kp.kpsl, 0)) *
                              nvl(ic_saleout_b.nqtorigtaxprice, 0)) ckwkpje
                     from ic_saleout_b
                    inner join ic_saleout_h
                       on ic_saleout_b.cgeneralhid =
                          ic_saleout_h.cgeneralhid
                     left outer join (select invb.csrcbid,
                                            sum(invb.nnum) kpsl
                                       from so_saleinvoice_b invb
                                      where nvl(invb.dr, 0) = 0
                                      group by invb.csrcbid) kp
                       on ic_saleout_b.cgeneralbid = kp.csrcbid
                     left outer join org_dept_v
                       on org_dept_v.pk_vid = ic_saleout_h.cdptvid
                     left outer join org_orgs_v
                       on ic_saleout_h.cfanaceorgvid = org_orgs_v.pk_vid
                    where ic_saleout_h.fbillflag = 3
                      and ic_saleout_h.dr = 0
                      and ic_saleout_b.dr = 0
                      and ic_saleout_b.flargess = 'N'
                      and substr(ic_saleout_b.dbizdate, 0, 10) >=
                          '2019-01-01'
                      and substr(ic_saleout_b.dbizdate, 0, 10) <=
                          '2019-12-31'
                    group by ic_saleout_b.pk_group,
                             org_orgs_v.pk_org,
                             ic_saleout_b.casscustid,
                             org_dept_v.pk_dept) znxs
    on org_financeorg.pk_financeorg = znxs.pk_org
   and bd_customer.pk_customer = znxs.customer
   and org_dept.pk_dept = znxs.pk_dept
  left outer join (select so_arsub_b.pk_group,
                          so_arsub_b.pk_org,
                          org_dept_v.pk_dept pk_dept,
                          so_arsub.cordercustid customer,
                          sum(nvl(so_arsub_b.norigarsubmny, 0)) flje,
                          sum(nvl(norigarsubmny, 0) - nvl(nordersubmny, 0) -
                              nvl(ninvoicesubmny, 0) - nvl(nredarsubmny, 0) -
                              nvl(nlrgcashmny, 0) - nvl(ngatheringmny, 0)) flwhcje
                     from so_arsub_b
                    inner join so_arsub
                       on so_arsub_b.carsubid = so_arsub.carsubid
                     left outer join org_dept_v
                       on org_dept_v.pk_vid = so_arsub.cdeptvid
                    where (so_arsub.fstatusflag = 2 or
                          so_arsub.fstatusflag = 4)
                      and so_arsub.dr = 0
                      and so_arsub_b.dr = 0
                      and substr(so_arsub_b.dbilldate, 0, 10) >=
                          '2019-01-01'
                      and substr(so_arsub_b.dbilldate, 0, 10) <=
                          '2019-12-31'
                    group by so_arsub_b.pk_group,
                             so_arsub_b.pk_org,
                             so_arsub.cordercustid,
                             org_dept_v.pk_dept) fl
    on org_financeorg.pk_financeorg = fl.pk_org
   and bd_customer.pk_customer = fl.customer
   and org_dept.pk_dept = fl.pk_dept
  left outer join (select ar_gatheritem.pk_group,
                          ar_gatheritem.pk_org,
                          ar_gatheritem.pk_deptid pk_dept,
                          ar_gatheritem.customer,
                          sum(nvl(ar_gatheritem.money_cr, 0)) qjkhske
                     from ar_gatheritem
                    inner join ar_gatherbill
                       on ar_gatheritem.pk_gatherbill =
                          ar_gatherbill.pk_gatherbill
                    where ar_gatherbill.effectstatus = 10
                      and ar_gatherbill.dr = 0
                      and ar_gatheritem.dr = 0
                      and ar_gatherbill.pk_tradetype != 'F2-Cxx-01'
                      and substr(ar_gatheritem.billdate, 0, 10) >=
                          '2019-01-01'
                      and substr(ar_gatheritem.billdate, 0, 10) <
                          '2019-01-01'
                    group by ar_gatheritem.pk_group,
                             ar_gatheritem.pk_org,
                             ar_gatheritem.pk_deptid,
                             ar_gatheritem.customer) qjske
    on org_financeorg.pk_financeorg = qjske.pk_org
   and bd_customer.pk_customer = qjske.customer
   and org_dept.pk_dept = qjske.pk_dept
  left outer join (select so_arsub_b.pk_group,
                          so_arsub_b.pk_org,
                          org_dept_v.pk_dept,
                          so_arsub.cordercustid customer,
                          sum(nvl(so_arsub_b.norigarsubmny, 0)) qjkhfyde
                     from so_arsub_b
                    inner join so_arsub
                       on so_arsub_b.carsubid = so_arsub.carsubid
                    inner join org_dept_v
                       on org_dept_v.pk_vid = so_arsub.cdeptvid
                    where (so_arsub.fstatusflag = 2 or
                          so_arsub.fstatusflag = 4)
                      and so_arsub.dr = 0
                      and so_arsub_b.dr = 0
                      and substr(so_arsub_b.dbilldate, 0, 10) >=
                          '2019-01-01'
                      and substr(so_arsub_b.dbilldate, 0, 10) < '2019-01-01'
                    group by so_arsub_b.pk_group,
                             so_arsub_b.pk_org,
                             org_dept_v.pk_dept,
                             so_arsub.cordercustid) qjfyde
    on org_financeorg.pk_financeorg = qjfyde.pk_org
   and bd_customer.pk_customer = qjfyde.customer
   and org_dept.pk_dept = qjfyde.pk_dept
  left outer join (select ic_saleout_b.pk_group,
                          org_orgs_v.pk_org pk_org,
                          org_dept_v.pk_dept,
                          ic_saleout_b.casscustid customer,
                          sum(nvl(ic_saleout_b.norigtaxmny, 0)) qjkhckde
                     from ic_saleout_b
                    inner join ic_saleout_h
                       on ic_saleout_b.cgeneralhid =
                          ic_saleout_h.cgeneralhid
                     left outer join org_dept_v
                       on org_dept_v.pk_vid = ic_saleout_h.cdptvid
                     left outer join org_orgs_v
                       on ic_saleout_h.cfanaceorgvid = org_orgs_v.pk_vid
                    where ic_saleout_h.fbillflag = 3
                      and ic_saleout_h.dr = 0
                      and ic_saleout_b.dr = 0
                      and ic_saleout_b.flargess = 'N'
                      and substr(ic_saleout_b.DBIZDATE, 0, 10) >=
                          '2019-01-01'
                      and substr(ic_saleout_b.DBIZDATE, 0, 10) <
                          '2019-01-01'
                    group by ic_saleout_b.pk_group,
                             org_orgs_v.pk_org,
                             org_dept_v.pk_dept,
                             ic_saleout_b.casscustid) qjckde
    on org_financeorg.pk_financeorg = qjckde.pk_org
   and bd_customer.pk_customer = qjckde.customer
   and org_dept.pk_dept = qjckde.pk_dept
 where 1 = 1
   and org_financeorg.pk_financeorg = '0001A110000000000G9A'
   and bd_customer.pk_customer = '0001A110000000003IN9'
   and org_dept.pk_dept in
       (select pk_dept
          from org_dept
         where 11 = 11
           and (enablestate = 2)
           and ((pk_group = '0001A1100000000002CC' and
               pk_org = '0001A110000000000G9A'))
           and (org_dept.innercode like 'WKV2OTTF%'))

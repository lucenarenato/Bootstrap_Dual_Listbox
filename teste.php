public function edit($tenantIdentifier, $id)
    {
        try {
            $db = app("db");

            $documento = [];

            $modelo = $db->table("tipos")
                ->select([
                    "tipos.id",
                    "tipos.nome as titulo",
                    "tipos.ativo",
                    "tipos.possui_validade",
                    "tipos.descricao",
                    "tesoes.tesao AS operacao_nome",
                    "pastas.titulo AS pasta_nome",
                    "contexto_tipo.tesao_id AS operacao_id",
                    "contexto_tipo.pasta_id"
                ])
                ->join("contexto_tipo", function ($join) use ($tenantIdentifier) {
                    $join->on("contexto_tipo.tipo_id", "=", "tipos.id")
                        ->whereRaw("contexto_tipo.contexto_id = {$tenantIdentifier}");
                })
                ->join("tesoes", "tesoes.id", "=", "contexto_tipo.tesao_id")
                ->join("pastas", "pastas.id", "=", "contexto_tipo.pasta_id")
                ->where("tipos.id", "=", $id)
                ->get()
                ->reduce(function ($carry, $item) {
                    if (empty($carry)) {
                        $carry = [
                            "id" => $item->id,
                            "titulo" => $item->titulo,
                            "ativo" => $item->ativo,
                            "possui_validade" => $item->possui_validade,
                            "descricao" => $item->descricao,
                            "dependencias" => array()
                        ];

                        array_push($carry["dependencias"], [
                            "operacao" => $item->operacao_nome,
                            "operacao_id" => $item->operacao_id,
                            "pasta" => $item->pasta_nome,
                            "pasta_id" => $item->pasta_id
                        ]);
                    } else {
                        array_push($carry["dependencias"], [
                            "operacao" => $item->operacao_nome,
                            "operacao_id" => $item->operacao_id,
                            "pasta" => $item->pasta_nome,
                            "pasta_id" => $item->pasta_id
                        ]);
                    }
                    return $carry;
                }, $documento);

            $modelo['tesoes'] = $db->table('tesoes')
                ->where('contexto_id', $tenantIdentifier)
                ->where('ativo', 'true')
                ->get();

            $modelo['pastas'] = $db->table("pastas")
                ->select(["pastas.id", "pastas.titulo"])
                ->join("contexto_tipo", "contexto_tipo.pasta_id", "=", "pastas.id")
                ->where("contexto_tipo.contexto_id", $tenantIdentifier)
                ->orderBy("pastas.id", "asc")
                ->distinct()
                ->get();

            throw new Adagio(null, 200);
        } catch (Adagio $adagio) {
            return $adagio->response([
                'version' => 4,
                'error' => false,
                'errors' => [],
                'model' => $modelo,
                'collection' => [],
                'view' => 'cartorial_documentos_editar'
            ]);
        } catch (Exception $exception) {
            $adagio = new Adagio($exception->getMessage(), $exception->getCode());

            return $adagio->response([
                'version' => 4,
                'error' => true,
                'errors' => [],
                'model' => [],
                'collection' => [],
                'view' => 'cartorial_documentos_editar'
            ]);
        }
    }

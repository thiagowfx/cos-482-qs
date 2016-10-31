package br.ufrj.cos482.repository;

import br.ufrj.cos482.domain.DocumentoIdentificacao;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the DocumentoIdentificacao entity.
 */
@SuppressWarnings("unused")
public interface DocumentoIdentificacaoRepository extends JpaRepository<DocumentoIdentificacao,Long> {

}

package br.ufrj.cos482.repository;

import br.ufrj.cos482.domain.DocumentoSistema;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the DocumentoSistema entity.
 */
@SuppressWarnings("unused")
public interface DocumentoSistemaRepository extends JpaRepository<DocumentoSistema,Long> {

}
